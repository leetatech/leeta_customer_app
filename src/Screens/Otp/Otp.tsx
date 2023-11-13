import React, {FC, useMemo, useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import PaddedLayout from '../../Components/Layouts/PaddedLayout';
import Buttons from '../../Components/Buttons/Buttons';
import {colors} from '../../Constants/Colors';
import {OtpInput} from 'react-native-otp-entry';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {NAVIGATION_ICON, OTP_IMAGE} from '../../Assets/svgImages';
import CustomToast from '../../Components/Toast/CustomToast';

interface IOTPInputProps {
  navigation: NavigationProp<ParamListBase>;
}

const Otp: FC<IOTPInputProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);

  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otp, setOtp] = useState('');
  const [isOtpCorrect, setIsOtpCorrect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const spinAnim = new Animated.Value(0);
  const interpolateRotation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{rotate: interpolateRotation}],
  };
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 5,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  });

  const handleCodeChange = (newCode: string) => {
    setOtp(newCode);
    console.log('newCode', newCode);
  };

  const toggleErrMsg = () => {
    setShowErrorMsg(false);
  };
  const handleVerifyOTP = () => {
    if (otp === '123456') {
      setIsOtpCorrect(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (isOtpCorrect) {
          navigation.navigate('EmailVerification');
        }
      }, 3000);
    } else {
      setIsOtpCorrect(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowErrorMsg(true);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 5000);
      }, 3000);
    }
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
    <React.Fragment>
      <PaddedLayout>
        <TouchableOpacity onPress={navigation.goBack}>
          <NAVIGATION_ICON />
        </TouchableOpacity>

        <View style={styles.mainContainer}>
          <OTP_IMAGE />
          {loading && (
            <Animated.View style={animatedStyle}>
              <CustomLoader />
            </Animated.View>
          )}
          <Text style={styles.bigText}>Check your Email.</Text>
          <Text style={styles.smalltext}>we’ve sent an OTP to .</Text>
          <Text style={styles.smalltext}>
            dumebi********@gmail.com to get verified.
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <View style={styles.container}>
            <OtpInput
              numberOfDigits={6}
              focusColor={colors.BLACK}
              focusStickBlinkingDuration={200}
              onTextChange={handleCodeChange}
              onFilled={text => console.log(`OTP is ${text}`)}
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
            onPress={handleVerifyOTP}
          />
        </View>
        {showErrorMsg && (
          <CustomToast onPress={toggleErrMsg}>
            <Text>Invalid OTP. Plesae try again</Text>
          </CustomToast>
        )}
      </PaddedLayout>
    </React.Fragment>
  );
};

export default Otp;
