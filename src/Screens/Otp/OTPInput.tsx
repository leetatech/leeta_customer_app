import React, {FC, useMemo, useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import { IOTPInputProps } from './OTPInputPropsType';
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
import { applicationErrorCode } from '../../errors';

const OTPInput: FC<IOTPInputProps> = props => {
  const {navigation, route} = props;
  const styles = useMemo(() => createStyles(), []);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  let {loading, message, userEmail} = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();

  const handleCodeChange = (newCode: string) => {
    setOtp(newCode);
  };
  
  const toggleErrMsg = () => {
    setShowErrorMsg(false);
  };

  const handleVerifyOTP = (actualOtp: string) => {
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
        console.log(result);
        if (response && result && result.data.success) {
          switch (route.params.screenId) {
            case 'Signup':
              navigation.navigate('EmailVerification');
              break;
            case 'ForgotPassword':
              navigation.navigate('CreateNewPassword');
              break;
            default:
              navigation.navigate('SignIn');
          }
          setOtp('');
        } else {
          console.log("Error")
          console.log(result.data.error_code)
          const errorCodeString: string = result.data.error_code;

          // Convert to integer
          const errorCode: number = parseInt(errorCodeString, 10);
          setShowErrorMsg(true);
          switch (errorCode) {
            case applicationErrorCode.TokenValidationError:
              setErrorMsg("This is not a valid OTP. OTP may have expired.");
              break;
            default:
              setErrorMsg("Unknown error has occurred while trying to reset your email. Kindly try again shortly.");
              break;
          }
          setOtp('');
        }
      })
      .catch(error => {
        console.error('Error verifying OTP:', error);
      });
  };
  const maskedEmail = maskEmail(userEmail as string);

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
    <React.Fragment>
      <FormMainContainer>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image source={NAVIGATION_ARROW} />
        </TouchableOpacity>

        <View style={styles.mainContainer}>
          <Image source={OTPIMAGE} />
          {loading && <CustomLoader />}

          <Text style={styles.bigText}>Check your Email.</Text>
          <Text style={styles.smalltext}>we’ve sent an OTP to .</Text>
          <Text style={styles.smalltext}>{maskedEmail} to get verified.</Text>
        </View>

        <View style={styles.otpContainer}>
          <View style={styles.container}>
            <OtpInput
              numberOfDigits={6}
              focusColor={colors.BLACK}
              focusStickBlinkingDuration={200}
              onTextChange={handleCodeChange}
              onFilled={otp => handleVerifyOTP(otp)}
              theme={{
                pinCodeContainerStyle: styles.input,
                pinCodeTextStyle: styles.inputText,
              }}             
            />
          </View>
          <View style={styles.resendOtpContainer}>
            {!isTimerRunning ? (
              <TouchableOpacity>
                <Text style={styles.resendOtp}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timer}>
                Time Remaining {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title="Verify Now"
            disabled={false}
            buttonStyle={undefined}
            textStyle={undefined}
            onPress={() => handleVerifyOTP(otp)}
          />
        </View>
        {showErrorMsg && (
          <CustomToast onPress={toggleErrMsg}>
            <Text>{errorMsg}.</Text>
          </CustomToast>
        )}
      </FormMainContainer>
    </React.Fragment>
  );
};

export default OTPInput;