import React, {FC, useState, useMemo} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import createStyles from './styles';
import FormTexts from '../../Components/FormTexts/FormTexts';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {View,TouchableOpacity} from 'react-native';
import {NAVIGATION_ICON} from '../../Assets/svgImages';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import Buttons from '../../Components/Buttons/Buttons';
import {colors} from '../../Constants/Colors';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {resetPassword} from '../../redux/slices/auth/userServices';
import CustomToast from '../../Components/Toast/CustomToast';
import {applicationErrorCode} from '../../errors';
import Fonts from '../../Constants/Fonts';
import CustomLoader from '../../Components/Loader/CustomLoader';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const CreateNewPassword: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let {message, userEmail,loading} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const toggleErrMsg = () => {
    setShowErrorMsg(false);
  };

  const formik = useFormik({
    initialValues: {
      email: userEmail!,
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password cannot be empty')
        .trim()
        .max(20, 'Password must not exceed 20 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          'Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character',
        ),
      confirm_password: Yup.string()
        .required('Confirm Password cannot be empty')
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .trim(),
    }),
    enableReinitialize: false,
    onSubmit: () => {},
  });

  const handlePasswordReset = async () => {
    try {
      const payload = {
        confirm_password: formik.values.confirm_password,
        email: formik.initialValues.email,
        password: formik.values.password,
      };
      const response = await dispatch(resetPassword(payload));
      const result = response.payload as Record<string, Record<string, string>>;
      if (
        payload.confirm_password === payload.password &&
        response &&
        result &&
        result.data.body
      ) {
        navigation.navigate('SignIn');
        formik.resetForm();
      } else {
        const errorCodeString: string = result.data.error_code;
        const errorCode: number = parseInt(errorCodeString, 10);
        setShowErrorMsg(true);
        switch (errorCode) {
          case applicationErrorCode.PasswordValidationError:
            setErrorMsg(
              message ||
                result.data.message ||
                'An error occured because passwords does not match',
            );
            break;
          case applicationErrorCode.UserNotFoundError:
            setErrorMsg(
              message ||
                result.data.message ||
                'An error occurred because this is not a registered user. Kindly signup',
            );
            break;
          default:
            setErrorMsg(
            
                'An unknown error has occured while trying to reset password. Kindly try again',
            );
            break;
        }
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 5000);
        formik.resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <FormMainContainer>
      <TouchableOpacity onPress={navigation.goBack}>
        <NAVIGATION_ICON />
      </TouchableOpacity>
      {loading && <CustomLoader />}

      <FormTexts
        bigText="Create new password"
        smallText="Your new password must be different from any of your previous passwords."
      />
      <ScrollView>
        <View>
          <StyledTextInput
            label="Password"
            name="password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={() => formik.setFieldTouched('password')}
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
            <Fonts type="smallText" style={{color: colors.RED, paddingTop: 2}}>
              {formik.errors.password}
            </Fonts>
          )}
        </View>
        <View style={styles.confirmPasswordContainer}>
          <StyledTextInput
            label="Confirm Password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChangeText={formik.handleChange('confirm_password')}
            onBlur={() => formik.setFieldTouched('confirm_password')}
            secureTextEntry={!showConfirmPassword}
            isPassword={true}
            icon={
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-slash'}
                size={20}
                onPress={() => setShowConfirmPassword(prevState => !prevState)}
                style={styles.passwordIcon}
              />
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
                ? formik.errors.confirm_password.toString()
                : undefined
            }
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <Fonts
                type="smallText"
                style={{color: colors.RED, paddingTop: 2}}>
                {formik.errors.confirm_password}
              </Fonts>
            )}
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title="Create New Password"
            disabled={
              !formik.values.password ||
              !formik.values.confirm_password ||
              Object.keys(formik.errors).length > 0 ||
              formik.isSubmitting
            }
            onPress={handlePasswordReset}
            buttonStyle={undefined}
            textStyle={undefined}
          />
        </View>
      </ScrollView>
      {showErrorMsg && (
        <CustomToast onPress={toggleErrMsg}>
          <Fonts type="smallText">{errorMsg}</Fonts>
          {errorMsg}
        </CustomToast>
      )}
    </FormMainContainer>
  );
};

export default CreateNewPassword;
