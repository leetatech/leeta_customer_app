import React, {FC,useMemo, useRef, useState} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import { getState} from '../../redux/slices/order/orderServices';
import {useDispatch, useSelector} from 'react-redux';
import {DOWN_ARROW} from '../../Assets';
import {StateResponse} from '../../redux/slices/order/types';
import CustomModal from '../../Components/Modal/CustomModal';
import {RootState} from '../../redux/rootReducer';
import {
  updateUserLga,
  updateUserState,
} from '../../redux/slices/order/orderSlice';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddAddress: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const {states} = useSelector((state: RootState) => state.order);
  const [checked, setChecked] = useState(true);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [userState, setUserState] = useState('');
  const [userLga, setUserLga] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [screenTitle, setScreenTitle] = useState('Delivery Details');
  const [toggleModal, setToggleModal] = useState(false);
  const [allDataGotten, setAllDataGotten] = useState<string[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');

  const dispatch = useDispatch();

  const focusedInputRef = useRef<string | null>(null);
  const handleScreenTitle = (inputName: string, isFocused: boolean) => {
    setScreenTitle(isFocused ? 'Edit Details' : 'Delivery Details');

    if (isFocused) {
      focusedInputRef.current = inputName;
    } else {
      focusedInputRef.current = null;
    }
  };

  const getAllState = async () => {
    dispatch(getState())
      .then(response => {
        const result = response.payload as StateResponse;
        if (response && result && result.data) {
          const allStateNames = result.data.map(state => state.name);
          setAllDataGotten(allStateNames);
          setSelectedDropdown('state');

          setToggleModal(true);
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error getting states:', error);
      });
  };

  const getAllLgasForSelectedState = () => {
    setToggleModal(true);
    setSelectedDropdown('lga');
  };

  const handleSelectedstate = (item: string) => {
    setSelectedItem(item);
    const selectedState = states.data?.find(state => state.name === item);
    const lgas = selectedState?.lgas;
    setAllDataGotten(lgas!);
    setUserState(item);
    dispatch(updateUserState(item));
    setToggleModal(false);
  };

  const handleSelectedLga = (item: string) => {
    setSelectedItem(item);
    setUserLga(item);
    dispatch(updateUserLga(item));
    setToggleModal(false);
  };

  const getFormattedState = (state:string) => {
    if (!state) return '';
    return state.charAt(0) + state.slice(1).toLowerCase();
  };

  const updateDeliveryDetails = () => {
    navigation.navigate('OrderConfirmation');
  };

  return (
    <>
      <FormMainContainer>
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <ScreenTitle screenTitle={screenTitle} onPress={navigation.goBack} />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <StyledTextInput
                placeholder="Contact Name"
                name="contact Name"
                value={name}
                onChangeText={newName => setName(newName)}
                onBlur={() => handleScreenTitle('contact Name', false)}
                onFocus={() => handleScreenTitle('contact Name', true)}
                style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
                onFocusStyle={{borderColor: colors.ORANGE}}
              />
              <StyledTextInput
                placeholder="Phone Number"
                name="mobile Number"
                value={mobile}
                onChangeText={newMobile => setMobile(newMobile)}
                onBlur={() => handleScreenTitle('mobile Number', false)}
                onFocus={() => handleScreenTitle('mobile Number', true)}
                style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
                onFocusStyle={{borderColor: colors.ORANGE}}
              />
              <StyledTextInput
                placeholder="Address"
                name="Address"
                value={address}
                onChangeText={newAddress => setAddress(newAddress)}
                onBlur={() => handleScreenTitle('Address', false)}
                onFocus={() => handleScreenTitle('Address', true)}
                style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
                onFocusStyle={{borderColor: colors.ORANGE}}
              />
              <StyledTextInput
                placeholder="State"
                name="State"
                value={getFormattedState(userState)}
                onChangeText={newState => setUserState(newState)}
                onBlur={() => handleScreenTitle('State', false)}
                onFocus={() => handleScreenTitle('State', true)}
                style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
                onFocusStyle={{borderColor: colors.ORANGE}}
                image={DOWN_ARROW}
                onPress={getAllState}
              />
              {userState && (
                <StyledTextInput
                  placeholder="LGA"
                  name="lga"
                  value={userLga}
                  onChangeText={newLga => setUserLga(newLga)}
                  onBlur={() => handleScreenTitle('More Information', false)}
                  onFocus={() => handleScreenTitle('More Information', true)}
                  style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
                  onFocusStyle={{borderColor: colors.ORANGE}}
                  image={DOWN_ARROW}
                  onPress={getAllLgasForSelectedState}
                />
              )}

              <StyledTextInput
                placeholder="Additional Information"
                name="moreInfo"
                value={moreInfo}
                onChangeText={moreInfo => setMoreInfo(moreInfo)}
                onBlur={() => handleScreenTitle('state', false)}
                onFocus={() => handleScreenTitle('state', true)}
                style={{color: colors.DGRAY, fontWeight: '500', fontSize: 17}}
                onFocusStyle={{borderColor: colors.ORANGE}}
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
              onPress={updateDeliveryDetails}
            />
          </View>
        </ScrollView>
      </FormMainContainer>
      <CustomModal visible={toggleModal} style={{ height: 400 }}>
      <View style={styles.listSate}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {allDataGotten.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={
                selectedDropdown === 'state'
                  ? () => handleSelectedstate(item)
                  : () => handleSelectedLga(item)
              }
              style={[
                selectedItem === item && styles.selectedItemStyle,
              ]}
            >
              <Fonts
                type="normalGrayText"
                style={selectedItem === item ? styles.item_selected : styles.item_neutral}
              >
                {item}
              </Fonts>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </CustomModal>
    </>
  );
};

export default AddAddress;
