import React, {FC, useMemo, useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {IOTPInputProps} from './OTPInputPropsType';
import createStyles from './styles';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {NAVIGATION_ARROW, OTPIMAGE} from '../../Assets';
import Buttons from '../../Components/Buttons/Buttons';
import CustomLoader from '../../Components/Loader/CustomLoader';
import CustomToast from '../../Components/Toast/CustomToast';
import {OtpInput} from 'react-native-otp-entry';
import {colors} from '../../Constants/Colors';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {verifyOtp} from '../../redux/slices/auth/userServices';
import {maskEmail} from '../../utils';
import {applicationErrorCode} from '../../errors';
import { resetUserState} from '../../redux/slices/auth/userSlice';
import Fonts from '../../Constants/Fonts';

const OTPInput: FC<IOTPInputProps> = props => {
  const {navigation, route} = props;
  const styles = useMemo(() => createStyles(), []);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const otpRef: any = useRef(null);
  let {loading, message, userEmail, error} = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const maskedEmail = maskEmail(userEmail as string);

  const validateOtp = (otp: string): boolean => {
    if (otp.length !== 6) {
      return false;
    }
    const numericPattern = /^[0-9]+$/;
    if (!numericPattern.test(otp)) {
      return false;
    }
    return true;
  };

  const handleOtpCodeChange = (otp: string) => {
    setOtp(otp);
  };

  const handleVerifyOTP = (actualOtp: string) => {
    if (validateOtp(actualOtp)) {
      const payload = {
        code: actualOtp,
        target: userEmail,
      };
      dispatch(verifyOtp(payload))
        .then(response => {
          const result = response.payload as unknown as Record<
            string,
            Record<string, string>
          >;
          if (response && result && result.data.success) {
            if (route.params && route.params.screenId) {
              switch (route.params.screenId) {
                case 'Signup':
                  otpRef.current.setValue('');
                  navigation.navigate('EmailVerification');
                  break;
                case 'ForgotPassword':
                  otpRef.current.setValue('');
                  navigation.navigate('CreateNewPassword');
                  break;
                default:
                  navigation.navigate('SignIn');
              }
            } else {
              console.log('screen id invalidate');
            }
            setOtp('');
          } else {
            const errorCodeString: string = result.data.error_code;
            const errorCode: number = parseInt(errorCodeString, 10);
            switch (errorCode) {
              case applicationErrorCode.TokenValidationError:
                setErrorMsg(
                  message || 'This is not a valid OTP. OTP may have expired.',
                );
                break;
              default:
                setErrorMsg(
                  message ||
                    'Unknown error has occurred while trying to reset your email. Kindly try again shortly.',
                );
                break;
            }
            setOtp('');
            setTimeout(() => {
            dispatch(resetUserState());
            }, 5000);
          }
        })
        .catch(error => {
          console.error('Error verifying OTP:', error);
        });
    }
  };
  const toggleErrMsg = () => {
    dispatch(resetUserState());
  };

  useEffect(() => {
    if (isTimerRunning) {
      const countdown = setTimeout(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsTimerRunning(false);
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);

      return () => {
        clearTimeout(countdown);
      };
    }
  }, [isTimerRunning, minutes, seconds]);

  return (
    <FormMainContainer>
      <TouchableOpacity onPress={navigation.goBack} style={{width: 20}}>
        <Image source={NAVIGATION_ARROW} />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.otpContainer}>
          <View style={styles.mainContainer}>
            <Image source={OTPIMAGE} />
            {loading && <CustomLoader />}

            <Fonts type="boldBlack" style={styles.bigText}>Check your Email.</Fonts>
            <Fonts type="smallText">we’ve sent an OTP to .</Fonts>
            <Fonts type="smallText">{maskedEmail} to get verified.</Fonts>
          </View>
          <View style={styles.otpContainer}>
            <View style={styles.container}>
              <OtpInput
                numberOfDigits={6}
                focusColor={colors.BLACK}
                focusStickBlinkingDuration={200}
                onTextChange={handleOtpCodeChange}
                onFilled={otp => console.log(`OTP is ${otp}`)}
                theme={{
                  pinCodeContainerStyle: styles.input,
                  pinCodeTextStyle: styles.inputText,
                }}
                ref={otpRef}
              />
            </View>
            <View style={styles.resendOtpContainer}>
              {!isTimerRunning ? (
                <TouchableOpacity>
                  <Fonts type="smallText"  style={styles.resendOtp}>Resend OTP</Fonts>
                </TouchableOpacity>
              ) : (
                <Fonts type="smallText" >
                  Time Remaining {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Fonts>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonContainer}>
        <Buttons
          title="Verify Now"
          disabled={false}
          buttonStyle={undefined}
          textStyle={undefined}
          onPress={() => handleVerifyOTP(otp)}
        />
      </View>
      {error && (
        <CustomToast onPress={toggleErrMsg}>
          <Fonts type="smallText">{errorMsg}.</Fonts>
        </CustomToast>
      )}
    </FormMainContainer>
  );
};

export default OTPInput;
