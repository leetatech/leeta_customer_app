import React, {FC, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import FormTexts from '../../Components/FormTexts/FormTexts';
import {ScrollView} from 'react-native-gesture-handler';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../Constants/Colors';
import PaddedLayout from '../../Components/Layouts/PaddedLayout';
import Buttons from '../../Components/Buttons/Buttons';
import CustomModal from '../../Components/Modal/CustomModal';
import {SUCCESS, WARNING_ICON} from '../../Assets/svgImages';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const CreateAccount: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [checked, setChecked] = useState(true);
  const [accountVerification, setAccountVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Full name cannot be empty')
        .min(5, 'First name is too short')
        .max(20, 'First name is too long'),
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
    onSubmit: values =>
      console.log(
        `Full Name :${values.fullName}`,
        `Email : ${values.email}`,
        `Password: ${values.password}`,
      ),
  });

  const toggleAccountVerification = () => {
    setAccountVerification(true);
  };

  const handleSubmit = () => {
    setAccountVerification(false);
    formik.handleSubmit();
    if (!Object.keys(formik.errors).length) {
      const payload = {
        fullName: formik.values.fullName,
        email: formik.values.email,
        password: formik.values.password,
      };
      console.log('Payload', payload);
      navigation.navigate('Otp');
    }
  };

  return (
    <>
      <PaddedLayout>
        <TouchableOpacity onPress={navigation.goBack} />

        <FormTexts
          bigText="Create an account"
          smallText="Let’s get you started"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View>
                <StyledTextInput
                  label=""
                  placeholder="Enter Full Name"
                  onChangeText={formik.handleChange('fullName')}
                  value={formik.values.fullName}
                  name="fullName"
                  onBlur={formik.handleBlur('fullName')}
                  errors={formik.errors.fullName}
                  helperText={''}
                  icon={
                    formik.touched.fullName && formik.errors.fullName ?
                    <WARNING_ICON  style={styles.passwordIcon} /> :
                  ""}
                  inputStyle={formik.touched.fullName && formik.errors.fullName ? {borderColor: colors.RED} : undefined}
                />

                {formik.touched.fullName && formik.errors.fullName && (
                  <Text style={{color: colors.RED, paddingTop: 2}}>
                    {formik.errors.fullName}
                  </Text>
                )}
              </View>
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
                  inputStyle={formik.touched.email && formik.errors.email ? {borderColor: colors.RED} : undefined}
                  icon={
                    formik.touched.email && formik.errors.email ?
                    <WARNING_ICON  style={styles.passwordIcon} /> :
                  ""}
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
                  formik.touched.password && formik.errors.password ?
                  <WARNING_ICON  style={styles.passwordIcon} /> :
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    onPress={() => setShowPassword(prevState => !prevState)}
                    style={styles.passwordIcon} 
                  /> 
                }
                helperText={''}
                inputStyle={formik.touched.password && formik.errors.password ? {borderColor: colors.RED} : undefined}

              />
                {formik.touched.password && formik.errors.password && (
                  <Text style={{color: colors.RED, paddingTop: 2}}>
                    {formik.errors.password}
                  </Text>
                )}
              </View>
              <View>
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
                    I have read and i agree to Leeta’s
                    <Text style={styles.link}>
                      Privacy Policy, Terms and conditions.
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Buttons
            title="Get Started"
            disabled={
              (!formik.values.fullName && !formik.values.email) ||
              formik.isSubmitting
            }
            onPress={toggleAccountVerification}
            onPress2={() => navigation.navigate('SignIn')}
            buttonStyle={undefined}
            textStyle={undefined}
            text="Already have an account? "
            text2="Sign In"
          />
        </View>
      </PaddedLayout>
      <CustomModal visible={accountVerification}>
        <View style={styles.modal_description_container}>
          <SUCCESS />
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
            title="Got it!"
            disabled={false}
            buttonStyle={undefined}
            textStyle={undefined}
            onPress={handleSubmit}
          />
        </View>
      </CustomModal>
    </>
  );
};

export default CreateAccount;
