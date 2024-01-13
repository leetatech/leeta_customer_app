import React, {useMemo, useState, FC, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import createStyles from './styles';
import FormTexts from '../../Components/FormTexts/FormTexts';
import Buttons from '../../Components/Buttons/Buttons';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {colors} from '../../Constants/Colors';
import PaddedLayout from '../../Components/Layouts/PaddedLayout';
import {NAVIGATION_ICON, WARNING_ICON} from '../../Assets/svgImages';
import CustomLoader from '../../Components/Loader/CustomLoader';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const SignIn: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
          'Minimum of 8 characters with at least 1 Uppercase, Lowercase, Number and Special Character',
        ),
    }),
    enableReinitialize: false,
    validateOnBlur: false,
    // validateOnChange:false,
    onSubmit: values =>
      console.log(`Email: ${values.email}`, `Password: ${values.password}`),
  });

  const handeSubmit = () => {
    formik.handleSubmit();
    if (!Object.keys(formik.errors).length) {
      const payload = {
        email: formik.values.email,
        password: formik.values.password,
      };
      console.log('Payload', payload);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        navigation.navigate('MarketPlace');
      }, 3000);
    }
  };

  return (
    <PaddedLayout>
      <TouchableOpacity onPress={navigation.goBack}>
        <NAVIGATION_ICON />
      </TouchableOpacity>
      <FormTexts
        bigText="Welcome Back"
        smallText="Login to manage your account"
      />
      <View style={styles.mainContainer}>
        {loading && (
          <Animated.View style={animatedStyle}>
            <CustomLoader />
          </Animated.View>
        )}
        <View style={styles.container}>
          <View>
            <StyledTextInput
              label=""
              placeholder="Enter Email"
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
              name="email"
              onBlur={formik.handleBlur('email')}
              errors={formik.errors.email}
              helperText={''}
              inputStyle={
                formik.touched.email && formik.errors.email
                  ? {borderColor: colors.RED}
                  : undefined
              }
              icon={
                formik.touched.email && formik.errors.email ? (
                  <WARNING_ICON style={styles.passwordIcon} />
                ) : (
                  ''
                )
              }
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={{color: colors.RED, paddingTop: 2}}>
                {formik.errors.email}
              </Text>
            )}
          </View>

          <View>
            <StyledTextInput
              label=""
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              secureTextEntry={!showPassword}
              isPassword={true}
              icon={
                formik.touched.password && formik.errors.password ? (
                  <WARNING_ICON style={styles.passwordIcon} />
                ) : (
                  <Icon
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={20}
                    onPress={() => setShowPassword(prevState => !prevState)}
                    style={styles.passwordIcon}
                  />
                )
              }
              helperText={''}
              inputStyle={
                formik.touched.password && formik.errors.password
                  ? {borderColor: colors.RED}
                  : undefined
              }
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
      <View style={styles.buttonContainer}>
        <Buttons
          title="Log In"
          disabled={
            (!formik.values.email && !formik.values.password) ||
            formik.isSubmitting
          }
          onPress={handeSubmit}
          onPress2={() => navigation.navigate('CreateAccount')}
          buttonStyle={undefined}
          textStyle={undefined}
          text="Don't have an account?"
          text2="Sign Up"
        />
      </View>
    </PaddedLayout>
  );
};

export default SignIn;
