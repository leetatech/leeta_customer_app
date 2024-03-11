import React, {FC, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import ScreenTitle from '../../Components/ScreenTitle/ScreenTitle';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import StyledTextInput from '../../Components/InputFields/StyledTextInput';
import {colors} from '../../Constants/Colors';
import Buttons from '../../Components/Buttons/Buttons';
import createStyles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Fonts from '../../Constants/Fonts';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddAddress: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [checked, setChecked] = useState(true);
  const [name, setName] = useState('John Doe');
  const [mobile, setMobile] = useState('+234 700 6789 007');
  const [emailAddress, setEmailAddress] = useState('janedoe@gmail.com');
  const [userAddress, setUserAddress] = useState('alfred rewane street');
  const [addressState, setAddressState] = useState('Lagos');
  const [screenTitle, setScreenTitle] = useState('Delivery Details');

  const focusedInputRef = useRef<string | null>(null);
  const handleScreenTitle = (inputName: string, isFocused: boolean) => {
    setScreenTitle(isFocused ? 'Edit Details' : 'Delivery Details');

    if (isFocused) {
      focusedInputRef.current = inputName;
    } else {
      focusedInputRef.current = null;
    }
  };

  return (
    <>
      <FormMainContainer>
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <ScreenTitle screenTitle={screenTitle} onPress={navigation.goBack} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <StyledTextInput
              name="contactName"
              value={name}
              onChangeText={newName => setName(newName)}
              onBlur={() => handleScreenTitle('contactName', false)}
              onFocus={() => handleScreenTitle('contactName', true)}
              style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
              inputStyle={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}
              onFocusStyle={{borderBottomColor: colors.ORANGE}}
            />
            <StyledTextInput
              name="mobileNumber"
              value={mobile}
              onChangeText={newMobile => setMobile(newMobile)}
              onBlur={() => handleScreenTitle('mobileNumber', false)}
              onFocus={() => handleScreenTitle('mobileNumber', true)}
              style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
              inputStyle={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}
              onFocusStyle={{borderBottomColor: colors.ORANGE}}
            />
            <StyledTextInput
              name="email"
              value={emailAddress}
              onChangeText={newEmail => setEmailAddress(newEmail)}
              onBlur={() => handleScreenTitle('email', false)}
              onFocus={() => handleScreenTitle('email', true)}
              style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
              inputStyle={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}
              onFocusStyle={{borderBottomColor: colors.ORANGE}}
            />
            <StyledTextInput
              name="address"
              value={userAddress}
              onChangeText={newUserAddress => setUserAddress(newUserAddress)}
              onBlur={() => handleScreenTitle('address', false)}
              onFocus={() => handleScreenTitle('address', true)}
              style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
              inputStyle={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}
              onFocusStyle={{borderBottomColor: colors.ORANGE}}
            />

            <StyledTextInput
              name="state"
              value={addressState}
              onChangeText={newState => setAddressState(newState)}
              onBlur={() => handleScreenTitle('state', false)}
              onFocus={() => handleScreenTitle('state', true)}
              style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
              inputStyle={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}
              onFocusStyle={{borderBottomColor: colors.ORANGE}}
            />
            
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity>
            <Fontisto
              name={checked ? 'checkbox-passive' : 'check'}
              size={10}
              style={{color: checked ? colors.DGRAY : colors.ORANGE}}
              onPress={() => setChecked(prevState => !prevState)}
            />
          </TouchableOpacity>
          <Fonts type="normalGrayText">Set as Default Delivery Address</Fonts>
        </View>

        <View style={styles.button_container}>
          <Buttons
            title="Continue"
            disabled={false}
            buttonStyle={undefined}
            textStyle={undefined}
            onPress={() => navigation.navigate('OrderConfirmation')}
          />
        </View>
      </ScrollView>


      </FormMainContainer>
    </>
  );
};

export default AddAddress;
