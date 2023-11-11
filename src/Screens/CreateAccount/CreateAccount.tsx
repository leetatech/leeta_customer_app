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
import {SUCCESSS} from '../../Assets/svgImages';


interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const CreateAccount: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [checked, setChecked] = useState(true);
  const [accountVerification, setAccountVerification] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name cannot be empty')
        .min(3, 'First name is too short')
        .max(20, 'First name is too long'),
        lastName: Yup.string()
        .required('Last name cannot be empty')
        .min(3, 'Last name is too short')
        .max(20, 'Last name is too long'),
      email: Yup.string()
        .email('invalid email format')
        .required('Email cannot be empty'),
    }),
    enableReinitialize: false,
    onSubmit: values =>
      console.log(
        `First Name :${values.firstName}`,
        `Last Name : ${values.lastName}`,
        `Email: ${values.email}`,
        
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
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        
      };
      console.log('Payload', payload);
      //Call API to send the form to the server
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
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View>
                <StyledTextInput
                  label=""
                  placeholder="Enter First  Name"
                  onChangeText={formik.handleChange('firstName')}
                  value={formik.values.firstName}
                  name="firstName"
                  onBlur={formik.handleBlur('firstName')}
                  errors={formik.errors.firstName}
                  helperText={''}
                />
                {Object.keys(formik.errors).includes('firstName') && (
                  <Text style={{color: colors.RED, paddingTop: 2}}>
                    {formik.errors['firstName'] ? formik.errors.firstName : ''}
                    {formik.touched['firstName'] ? formik.touched.firstName : ''}
                  </Text>
                )}
              </View>
              <View>
                <StyledTextInput
                  label=""
                placeholder="Enter Last  Name"
                  onChangeText={formik.handleChange('lastName')}
                  value={formik.values.lastName}
                  name="lastName"
                  onBlur={formik.handleBlur('lastName')}
                  errors={formik.errors.lastName}
                  helperText={''}
                />
                {Object.keys(formik.errors).includes('lastName') && (
                  <Text style={{color: colors.RED, paddingTop: 2}}>
                    {formik.errors['lastName'] ? formik.errors.lastName : ''}
                    {formik.touched['lastName'] ? formik.touched.lastName : ''}
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
                />
                {Object.keys(formik.errors).includes('email') && (
                  <Text style={{color: colors.RED, paddingTop: 2}}>
                    {formik.errors['email'] ? formik.errors.email : ''}
                    {formik.touched['email'] ? formik.touched.email : ''}
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
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Buttons
            title="Get Started"
            disabled={
              (!formik.values.firstName && !formik.values.lastName) ||
              formik.isSubmitting
            }
            onPress={toggleAccountVerification}
            buttonStyle={undefined}
            textStyle={undefined}
            text="Already have an account?"
            text2="Sign In"
          />
        </View>
      </PaddedLayout>
      <CustomModal visible={accountVerification}>
        <View style={styles.modal_description_container}>
          <SUCCESSS />
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
