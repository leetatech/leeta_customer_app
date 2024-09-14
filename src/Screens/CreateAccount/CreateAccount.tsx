import React, {FC, useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import FormTexts from '../../Components/FormTexts/FormTexts';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import Buttons from '../../Components/Buttons/Buttons';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../Constants/Colors';
import CustomModal from '../../Components/Modal/CustomModal';
import {ScrollView} from 'react-native-gesture-handler';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {signup} from '../../redux/slices/auth/userServices';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {
  resetUserData,
  resetUserState,
  setFullName,
  setemail,
} from '../../redux/slices/auth/userSlice';
import {appUserType} from '../../config';
import {applicationErrorCode} from '../../errors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const CreateAccount: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isAccountNotCreated, setIsAccountNotCreated] = useState(false);
  const dispatch = useDispatch();
  let {loading, error, userData, errorCode} = useSelector(
    (state: RootState) => state.user,
  );
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      user_type: appUserType,
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Name cannot be empty'),
      email: Yup.string()
        .email('invalid email format')
        .trim()
        .required('Email cannot be empty'),
      password: Yup.string()
        .required('Password cannot be empty')
        .max(20, 'Password must not exceed 20 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          'Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character',
        ),
    }),
    validateOnChange: true,
    enableReinitialize: false,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const handleSubmit = async () => {
    if (!Object.keys(formik.errors).length) {
      const payload = {
        full_name: formik.values.full_name.trim(),
        email: formik.values.email.trim().toLowerCase(),
        password: formik.values.password.trim(),
        user_type: formik.values.user_type,
      };
      dispatch(setemail(formik.values.email.trim()));
      dispatch(setFullName(formik.values.full_name.trim()));
      dispatch(signup(payload));
    }
  };

  const toggleCreateAccount = () => {
    setIsAccountCreated(false);
    dispatch(resetUserData());
    navigation.navigate('OTPInput', {screenId: 'Signup'});
  };

  const toggleErrorModal = () => {
    dispatch(resetUserState());
    navigation.navigate('SignIn');
  };

  useEffect(() => {
    const storeToken = async () => {
      if (error && errorCode) {
        setDisplayErrorMsg(true);
        switch (errorCode) {
          case applicationErrorCode.DuplicateUserError:
            setErrorMsg('User already exists. Kindly proceed to login');
            break;
          default:
            setErrorMsg(
              'Unknown error has occurred while trying to sign up. Kindly try again shortly.',
            );
            break;
        }
        setIsAccountNotCreated(true);
        setChecked(true);
        dispatch(resetUserState());
        formik.resetForm();
      } else if (!error && Object.keys(userData).length > 0) {
        setIsAccountCreated(true);
        setChecked(true);
        formik.resetForm();
        dispatch(resetUserState());
      }
    };
    storeToken();
  }, [userData, error, errorCode]);

  return (
    <>
      <FormMainContainer>
        {loading && <CustomLoader />}
        <FormTexts
          bigText="Create an account"
          smallText="Let’s get you started"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View>
                <StyledTextInput
                  label="Full name"
                  placeholder='Enter Full Name'
                  onChangeText={formik.handleChange('full_name')}
                  value={formik.values.full_name}
                  name="full_name"
                  onBlur={() => formik.handleBlur('full_name')}
                  errors={formik.errors.full_name}
                  helperText={formik.errors.full_name}
                />
              </View>
              <View>
                <StyledTextInput
                  label="Email"
                  placeholder='Enter Email'
                  onChangeText={formik.handleChange('email')}
                  value={formik.values.email}
                  name="email"
                  onBlur={() => formik.handleBlur('email')}
                  errors={formik.errors.email}
                  helperText={formik.errors.email}
                />
              </View>
              <View>
                <StyledTextInput
                  label="Password"
                  placeholder='Enter Password'
                  name="password"
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  helperText={formik.errors.password}
                  errors={formik.errors.password}
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
                />
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity>
                    <Fontisto
                      name={checked ? 'checkbox-passive' : 'check'}
                      size={10}
                      color={colors.ORANGE}
                      style={{color: colors.ORANGE}}
                      onPress={() => setChecked(prevState => !prevState)}
                    />
                  </TouchableOpacity>
                  <Text style={styles.fp}>
                    I have read and I agree to Leeta’s{' '}
                    <Text style={styles.link}>
                      privacy policy, terms and conditions.
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Buttons
            title="Continue"
            disabled={
              !formik.values.email ||
              !formik.values.password ||
              !formik.values.full_name ||
              Object.keys(formik.errors).length > 0 ||
              checked ||
              formik.isSubmitting
            }
            onPress={handleSubmit}
            onPress2={() => navigation.navigate('SignIn')}
            buttonStyle={undefined}
            textStyle={undefined}
            text="Already have an account? "
            text2="sign In"
          />
        </View>
      </FormMainContainer>

      {displayErrorMsg && (
        <CustomModal visible={isAccountNotCreated}>
          <View style={styles.modal_description_container}>
            <Text style={styles.modal_content_title}>OOpps</Text>

            <Text style={styles.modal_content_description}>
              {`${errorMsg}`}
            </Text>
          </View>
          <View style={styles.modal_btn_container}>
            <Buttons
              disabled={false}
              buttonStyle={undefined}
              textStyle={undefined}
              onPress={toggleErrorModal}
              title="Ok"
            />
          </View>
        </CustomModal>
      )}
      {isAccountCreated && (
        <CustomModal visible={isAccountCreated}>
          <View style={styles.modal_description_container}>
            <Text style={styles.modal_content_title}>
              Verification in Progress
            </Text>
            <Text style={styles.modal_content_description}>
              You'll receive an email regarding the status of your verification
              request.
            </Text>
          </View>
          <View style={styles.modal_btn_container}>
            <Buttons
              disabled={false}
              buttonStyle={undefined}
              textStyle={undefined}
              onPress={toggleCreateAccount}
              title="Got it"
            />
          </View>
        </CustomModal>
      )}
    </>
  );
};

export default CreateAccount;
