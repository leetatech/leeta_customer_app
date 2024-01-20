import React, {FC, useMemo, useState} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import createStyles from './styles';
import FormTexts from '../../Components/FormTexts/FormTexts';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {NAVIGATION_ARROW} from '../../Assets';
import {ScrollView} from 'react-native-gesture-handler';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import Buttons from '../../Components/Buttons/Buttons';
import {colors} from '../../Constants/Colors';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {forgotPassword} from '../../redux/slices/auth/userServices';
import CustomLoader from '../../Components/Loader/CustomLoader';
import CustomToast from '../../Components/Toast/CustomToast';
import { setemail } from '../../redux/slices/auth/userSlice';
import { applicationErrorCode } from '../../errors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const ForgotPassword: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let {loading, message, errorCode} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const toggleErrMsg = () => {
    setShowErrorMsg(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('invalid email format')
        .required('Email cannot be empty'),
    }),
    enableReinitialize: false,
    onSubmit: () => {},
  });

  const handleForgotPassword = async () => {
    const payload = {
      email: formik.values.email,
    };
    dispatch(setemail(formik.values.email));
    dispatch(forgotPassword(payload))
      .then(response => {
        const result = response.payload as unknown as Record<
          string,
          Record<string, string>
        >;
        if (response && result && result.data.success) {
          navigation.navigate('OTPInput', {screenId: 'ForgotPassword'});
        } else {
          console.log(result.data.error_code)
          const errorCodeString: string = result.data.error_code;

          // Convert to integer
          const errorCode: number = parseInt(errorCodeString, 10);
          setShowErrorMsg(true);
            switch (errorCode) {
              case applicationErrorCode.UserNotFoundError:
                setErrorMsg("This email does not exist");
                break;
              default:
                setErrorMsg("Unknown error has occurred while trying to reset your email. Kindly try again shortly.");
                break;
            }
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <FormMainContainer>
      <TouchableOpacity onPress={navigation.goBack}>
        <Image source={NAVIGATION_ARROW} />
      </TouchableOpacity>
      <FormTexts
        bigText="Forgot Password"
        smallText="Enter your email address to reset your password"
      />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <View>
              {loading && <CustomLoader />}

              <StyledTextInput
                label="Email address"
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur('email')}
                errors={formik.errors.email}
                helperText={''}
              />
              {formik.touched.email && formik.errors.email && (
                <Text style={{color: colors.RED, paddingTop: 2}}>
                  {formik.errors.email}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title="Continue"
            disabled={
              !formik.values.email ||
              Object.keys(formik.errors).length > 0 ||
              formik.isSubmitting
            }
            onPress={handleForgotPassword}
            buttonStyle={undefined}
            textStyle={undefined}
          />
        </View>
      </ScrollView>
      {showErrorMsg && (
        <CustomToast onPress={toggleErrMsg}>
          <Text>{errorMsg}</Text>
        </CustomToast>
      )}
    </FormMainContainer>
  );
};

export default ForgotPassword;
