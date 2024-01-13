import React, {FC, useState, useMemo} from 'react'; 
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import FormTexts from '../../Components/FormTexts/FormTexts';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {NAVIGATION_ICON} from '../../Assets/svgImages';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import Buttons from '../../Components/Buttons/Buttons';
import {colors} from '../../Constants/Colors';
import {useFormik} from 'formik';
import * as Yup from 'yup';

interface IProps {
    navigation: NavigationProp<ParamListBase>;
}

const CreateNewPassword: FC<IProps> = ({navigation}) => {
    const styles = useMemo(() => createStyles(), []);
		const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
			initialValues: {
				email: '',
				password: '',
				confirmPassword: '',
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
					confirmPassword: Yup.string()
						.required('Confirm Password cannot be empty')
						.max(20, 'Password must not exceed 20 characters')
						.matches(
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
							'Must contain at least 8 characters with 1 Uppercase, Lowercase, Number and Special Character',
						),
			}),
			enableReinitialize: false,
			onSubmit: values =>
				console.log(
					`Email: ${values.email}`,
				),
		});

		const handleSubmit = async () => {
			if (!Object.keys(formik.errors).length) {
				const payload = {
					email: formik.values.email,
				};
				console.log("create new password")
			}
		}

    

    return (
        <FormMainContainer>
            <TouchableOpacity onPress={navigation.goBack}>
				<NAVIGATION_ICON />
			</TouchableOpacity>
            <FormTexts
                bigText="Create new password"
                smallText='Your new password must be different from any of your previous passwords.'
            />
            <ScrollView>
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
								</View>
								<View style={styles.confirmPasswordContainer}>
									<StyledTextInput
										label="Confirm Password"
										name="confirmPassword"
										value={formik.values.confirmPassword}
										onChangeText={formik.handleChange('confirmPassword')}
										onBlur={formik.handleBlur('confirmPassword')}
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
								</View>
                <View style={styles.buttonContainer}>
                <Buttons
                    title="Create New Password"
                    disabled={
                    !formik.values.email ||
                    Object.keys(formik.errors).length > 0 ||
                    formik.isSubmitting
                    }
                    onPress={handleSubmit}
                    buttonStyle={undefined}
                    textStyle={undefined}
                />
                </View>
            </ScrollView>
        </FormMainContainer>
    );
};

export default CreateNewPassword;