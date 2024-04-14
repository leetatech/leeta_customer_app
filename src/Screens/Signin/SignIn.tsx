import React, {useMemo, useState, FC, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import createStyles from './styles';
import FormTexts from '../../Components/FormTexts/FormTexts';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import Buttons from '../../Components/Buttons/Buttons';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {colors} from '../../Constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/slices/auth/userServices';
import {RootState} from '../../redux/rootReducer';
import CustomModal from '../../Components/Modal/CustomModal';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {appUserType} from '../../config';
import {
  resetUserData,
  resetUserState,
  setemail,
} from '../../redux/slices/auth/userSlice';
import {applicationErrorCode} from '../../errors';
import Fonts from '../../Constants/Fonts';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignIn: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCodeMsg, setErrorCodeMsg] = useState('');
  const [showErrorCodeMsg, setShowErrorCodeMsg] = useState(false);
  let {loading, errorCode, error, userData, message} = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      user_type: appUserType,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('invalid email format')
        .required('Email cannot be empty')
        .trim(),
      password: Yup.string()
        .required('Password cannot be empty')
        .max(20, 'Password must not exceed 20 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          'Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character',
        ),
    }),
    enableReinitialize: false,
    validateOnBlur: false,
    onSubmit: () => {},
  });

  const handleSubmit = async () => {
    if (!Object.keys(formik.errors).length) {
      const payload = {
        email: formik.values.email.trim(),
        password: formik.values.password.trim(),
        user_type: formik.values.user_type,
      };
      try {
        await dispatch(login(payload));
        dispatch(setemail(formik.values.email.trim()));
      } catch (err) {}
    }
  };

  const navigateToVerify = () => {
    dispatch(resetUserData());
    setShowErrorMsg(false);
        navigation.navigate('OTPInput', {screenId: 'Signin'});

  };

  const dismissErrorCodeMessageModal = () => {
    dispatch(resetUserState());
    setShowErrorMsg(false);
    setShowErrorCodeMsg(false);
  };
  const handleNavigateToSignup = () => {
    dispatch(resetUserData());
    navigation.navigate('CreateAccount');
  };

  useEffect(() => {
    if (error && errorCode) {
      console.log(errorCode);
      // TODO: handle more signin error edge cases
      switch (errorCode) {
        case applicationErrorCode.InvalidUserRoleError:
        case applicationErrorCode.UserCategoryError:
          setErrorCodeMsg(
            message ||
              'You are trying to log into the wrong LEETA app. kindly sign in with the LEETA Vendor app',
          );
          break;
        case applicationErrorCode.CredentialsValidationError:
        case applicationErrorCode.UserNotFoundError:
          setErrorCodeMsg(
            message ||
              'An error has occurred while trying to sign in. Kindly try again shortly.',
          );
          break;
        default:
          setErrorCodeMsg(
            'An error has occurred while trying to sign in. Kindly try again shortly.',
          );
          break;
      }
      setShowErrorCodeMsg(true);
    } else if (!error && Object.keys(userData).length > 0) {
      formik.resetForm();
      const body = (userData as any).body;
      console.log('Body', body);
      if (
        body &&
        typeof body.email === 'object' &&
        body.email.verified === false
      ) {
        setShowErrorMsg(true);
        setErrorMsg(
          message ||
            'Your email is not verified. Kindly check email for OTP for email verification',
        );
        dispatch(resetUserState());
      } else if (
        body &&
        typeof body.email === 'object' &&
        body.email.verified === true
      ) {
        navigation.navigate('BottomNavigator');
      }
    }
  }, [userData, error, errorCode]);
  console.log('ERROR', error);
  console.log('ERRMSG', showErrorMsg);
  return (
    <>
      <FormMainContainer>
        {loading && <CustomLoader />}
        <FormTexts
          bigText="Welcome Back"
          smallText="Login to manage your account"
        />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View>
                <StyledTextInput
                  label="Email"
                  onChangeText={formik.handleChange('email')}
                  value={formik.values.email}
                  name="email"
                  onBlur={() => formik.handleBlur('email')}
                  errors={formik.errors.email}
                  helperText={formik.errors.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <Fonts
                    type="normalText"
                    style={{color: colors.RED, paddingTop: 2}}>
                    {formik.errors.email}
                  </Fonts>
                )}
              </View>

              <View>
                <StyledTextInput
                  label="Password"
                  name="password"
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  onBlur={() => formik.handleBlur('password')}
                  secureTextEntry={!showPassword}
                  isPassword={true}
                  icon={
                    <Icon
                      name={showPassword ? 'eye' : 'eye-slash'}
                      size={20}
                      onPress={() => setShowPassword(prevState => !prevState)}
                      style={styles.passwordIcon}
                    />
                  }
                  helperText={formik.errors.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <Fonts
                    type="normalText"
                    style={{color: colors.RED, paddingTop: 2}}>
                    {formik.errors.password}
                  </Fonts>
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Fonts type="normalText" style={styles.fp}>
                    I forgot my password
                  </Fonts>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Buttons
            title="Log In"
            disabled={
              !formik.values.email ||
              !formik.values.password ||
              Object.keys(formik.errors).length > 0 ||
              formik.isSubmitting
            }
            onPress={handleSubmit}
            onPress2={handleNavigateToSignup}
            buttonStyle={undefined}
            textStyle={undefined}
            text="Don't have an account?"
            text2="Sign Up"
          />
        </View>
      </FormMainContainer>

      {error && (
        <CustomModal visible={showErrorCodeMsg}>
          <View style={styles.modal_description_container}>
            <Fonts type="normalText" style={styles.modal_content_title}>
              OOpps
            </Fonts>
            <Fonts type="normalText" style={styles.modal_content_description}>
              {`${errorCodeMsg}`}
            </Fonts>
          </View>
          <View style={styles.modal_btn_container}>
            <Buttons
              disabled={false}
              buttonStyle={undefined}
              textStyle={undefined}
              onPress={dismissErrorCodeMessageModal}
              title="Ok"
            />
          </View>
        </CustomModal>
      )}
      {showErrorMsg && (
        <CustomModal visible={showErrorMsg}>
          <View style={styles.modal_description_container}>
            <Fonts type="normalText" style={styles.modal_content_title}>
              OOpps
            </Fonts>
            <Fonts type="normalText" style={styles.modal_content_description}>
              {`${errorMsg}`}
            </Fonts>
          </View>
          <View style={styles.modal_btn_container}>
            <Buttons
              disabled={false}
              buttonStyle={undefined}
              textStyle={undefined}
              onPress={navigateToVerify}
              title="Ok"
            />
          </View>
        </CustomModal>
      )}
    </>
  );
};

export default SignIn;
