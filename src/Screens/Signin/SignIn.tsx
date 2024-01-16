import React, {useMemo, useState, FC, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
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
import {NAVIGATION_ARROW} from '../../Assets';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { login} from '../../redux/slices/auth/userServices';
import {RootState} from '../../redux/rootReducer';
import CustomToast from '../../Components/Toast/CustomToast';
import CustomLoader from '../../Components/Loader/CustomLoader';
import { appUserType } from '../../config';
import { applicationErrorCode } from '../../errors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const SignIn: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false); //
  const [errorMsg, setErrorMsg] = useState('');
  let {loading, errorCode, error, userData} = useSelector(
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
        .required('Email cannot be empty'),
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

  const handleSubmit = () => {
    if (!Object.keys(formik.errors).length) {
      const payload = {
        email: formik.values.email,
        password: formik.values.password,
        user_type: formik.values.user_type,
      };
      dispatch(login(payload));
    }
  };
  const toggleErrMsg = () => {
    setShowErrorMsg(!showErrorMsg);
  };

  useEffect(() => {
    if (error && errorCode) {
      // TODO: handle more signup error edge cases
      switch (errorCode) {
        case applicationErrorCode.InvalidUserRoleError:
          setErrorMsg("You are logging into the wrong LEETA app. kindly sign in with the LEETA Vendor app");
          break;
        default:
          setErrorMsg("An error has occurred while trying to sign up. Kindly try again shortly.");
          break;
      }

      setShowErrorMsg(true);
      setTimeout(() => {
        setShowErrorMsg(false);
        formik.resetForm();
      }, 5000);
    } else if (!error && Object.keys(userData).length > 0) {
      formik.resetForm();
      const body = (userData as any).body;
      if(body && typeof body.email === 'object' && body.email.verified === false) {
        navigation.navigate('OTPInput');
      }else if(body && typeof body.email === 'object' && body.email.verified === true) {
        navigation.navigate('BottomNavigator');
      }
    }
  }, [userData, error, errorCode]);
  return (
    <FormMainContainer>
      <TouchableOpacity onPress={navigation.goBack}>
        <Image source={NAVIGATION_ARROW} />
      </TouchableOpacity>
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

            <View>
              <StyledTextInput
                label="Password"
                name="password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
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
                helperText={''}
              />
              {formik.touched.password && formik.errors.password && (
                <Text style={{color: colors.RED, paddingTop: 2}}>
                  {formik.errors.password}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.fp}>I forgot my password</Text>
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
          onPress2={() => navigation.navigate('CreateAccount')}
          buttonStyle={undefined}
          textStyle={undefined}
          text="Don't have an account?"
          text2="Sign Up"
        />
      </View>
      {showErrorMsg && (
        <CustomToast onPress={toggleErrMsg}>
          <Text>{errorMsg}</Text>
        </CustomToast>
      )}
    </FormMainContainer>
  );
};

export default SignIn;
