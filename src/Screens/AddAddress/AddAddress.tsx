import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
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
import {getState} from '../../redux/slices/order/orderServices';
import {useDispatch, useSelector} from 'react-redux';
import {DOWN_ARROW} from '../../Assets';
import {StateResponse} from '../../redux/slices/order/types';
import {RootState} from '../../redux/rootReducer';
import {
  updateUserLga,
  updateUserState,
} from '../../redux/slices/order/orderSlice';
import CustomLoader from '../../Components/Loader/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UpdateUserData,
  updateUserData,
} from '../../redux/slices/auth/userServices';
import CustomToast from '../../Components/Toast/CustomToast';
import {
  GuestData,
  updateGuestData,
} from '../../redux/slices/auth/guestServices';
import DeviceInfo from 'react-native-device-info';
import useUserType from '../../redux/manageUserType/userType';
import {user} from '../../redux/manageUserType/checkUserType';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddAddress: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const {states} = useSelector((state: RootState) => state.order);
  const [checked, setChecked] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [userState, setUserState] = useState('');
  const [userLga, setUserLga] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [screenTitle, setScreenTitle] = useState('Delivery Details');
  const [allDataGotten, setAllDataGotten] = useState<string[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<string | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const modalizeRef = useRef<Modalize>(null);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const userType = useUserType();
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

  const handleFocus = () => {
    setIsFocused(true);
    if (mobile === '') {
      setMobile('+234');
    }
    handleScreenTitle('mobile Number', true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (mobile === '+234') {
      setMobile('');
    }
    handleScreenTitle('mobile Number', false);
  };
  const getAllState = async () => {
    dispatch(getState())
      .then(response => {
        const result = response.payload as StateResponse;
        if (response && result && result.data) {
          const allStateNames = result.data.map(state => state.name);
          setAllDataGotten(allStateNames);
          setSelectedDropdown('state');
          modalizeRef.current?.open();
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error getting states:', error);
      });
  };

  const getAllLgasForSelectedState = () => {
    modalizeRef.current?.open();
    setSelectedDropdown('lga');
  };

  const handleSelectedstate = (item: string) => {
    const selectedState = states.data?.find(state => state.name === item);
    const lgas = selectedState?.lgas;
    setAllDataGotten(lgas!);
    setUserState(item);
    setHighlightedIndex(item);
    dispatch(updateUserState(item));
    modalizeRef.current?.close();
  };

  const handleSelectedLga = (item: string) => {
    setUserLga(item);
    setHighlightedIndex(item);

    dispatch(updateUserLga(item));
    modalizeRef.current?.close();
  };

  const getFormattedState = (state: string) => {
    if (!state) return '';
    return state.charAt(0) + state.slice(1).toLowerCase();
  };

  const updateDeliveryDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (userType === user.registered) {
        updateUserInformation();
      } else if (userType === user.guest) {
        updateGuestInformation();
      }
    }, 2000);
  };

  const updateUserInformation = async () => {
    const payload: UpdateUserData = {
      addresses: [
        {
          address_type: 'customer_resident_address',
          city: '',
          closest_landmark: '',
          coordinate: {
            latitude: 0,
            longitude: 0,
          },
          default_delivery_address: true,
          full_address: address,
          lga: userLga,
          state: userState,
          verified: true,
        },
      ],
      dob: '',
      email: {
        address: userEmail,
        verified: true,
      },
      first_name: firstName,
      has_pin: true,
      id: '',
      is_blocked: true,
      is_blocked_reason: '',
      last_name: lastName,
      phone: {
        number: mobile,
        primary: true,
        verified: true,
      },
      pin_blocked: true,
      status: 'SIGNEDUP',
    };
    dispatch(updateUserData(payload))
      .then(response => {
        const result = response.payload as any;
        if (response && result) {
          setMsg(result.data.message);
          setShowMsg(true);
          setTimeout(() => {
            setShowMsg(false);
            navigation.navigate('OrderConfirmation');
          }, 2000);
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error updating user data', error);
      });
  };

  const updateGuestInformation = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const payload: GuestData = {
      address: {
        address_type: 'customer_resident_address',
        city: userState,
        closest_landmark: '',
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
        default_delivery_address: true,
        full_address: address,
        lga: userLga,
        state: userState,
        verified: true,
      },
      default_delivery_address: true,
      device_id: deviceId,
      email: '',
      first_name: firstName,
      id: '',
      last_name: lastName,
      location: {
        latitude: 0,
        longitude: 0,
      },
      number: mobile,
    };
    dispatch(updateGuestData(payload))
      .then(response => {
        const result = response.payload as any;
        if (response && result) {
          setMsg(result.data.message);
          setShowMsg(true);
          setTimeout(() => {
            setShowMsg(false);
            navigation.navigate('OrderConfirmation');
          }, 2000);
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error updating user data', error);
      });
  };

  const fetchUserAddress = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userAddress');
      const retrievedUserInfoormation =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      if (retrievedUserInfoormation) {
        setFirstName(retrievedUserInfoormation.first_name);
        setLastName(retrievedUserInfoormation.last_name);
        const lastIndex = retrievedUserInfoormation.addresses.length - 1;
        setAddress(
          retrievedUserInfoormation.addresses[lastIndex]?.full_address,
        );
        setUserState(retrievedUserInfoormation.addresses[lastIndex]?.state);
        setUserLga(retrievedUserInfoormation.addresses[lastIndex]?.lga);
        setMobile(retrievedUserInfoormation?.phone.number);
        setUserEmail(retrievedUserInfoormation?.email.address);
      } else {
        console.error('Unexpected data structure:', retrievedUserInfoormation);
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };

  useEffect(() => {
    if (userType === user.registered) {
      fetchUserAddress();
    }
  }, [userType]);

  return (
    <>
      <FormMainContainer>
        <ScreenTitle screenTitle={screenTitle} onPress={navigation.goBack} />
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              {loading && <CustomLoader />}
              <StyledTextInput
                placeholder="First Name"
                name="First Name"
                value={firstName}
                onChangeText={newFirstName => setFirstName(newFirstName)}
                onBlur={() => handleScreenTitle('First Name', false)}
                onFocus={() => handleScreenTitle('First Name', true)}
                onFocusStyle={{borderColor: colors.ORANGE}}
              />
              <StyledTextInput
                placeholder="Last Name"
                name="Last Name"
                value={lastName}
                onChangeText={newLastName => setLastName(newLastName)}
                onBlur={() => handleScreenTitle('Last Name', false)}
                onFocus={() => handleScreenTitle('Last Name', true)}
                onFocusStyle={{borderColor: colors.ORANGE}}
              />

              <StyledTextInput
                placeholder="Phone Number"
                name="mobile Number"
                value={mobile}
                onChangeText={newMobile => setMobile(newMobile)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onFocusStyle={{borderColor: colors.ORANGE}}
              />
              <StyledTextInput
                placeholder="Address"
                name="Address"
                value={address}
                onChangeText={newAddress => setAddress(newAddress)}
                onBlur={() => handleScreenTitle('Address', false)}
                onFocus={() => handleScreenTitle('Address', true)}
                onFocusStyle={{borderColor: colors.ORANGE}}
              />
            
                  <StyledTextInput
                    placeholder="State"
                    name="State"
                    editable={false}
                    value={getFormattedState(userState)}
                    onChangeText={newState => setUserState(newState)}
                    onBlur={() => handleScreenTitle('State', false)}
                    onFocus={() => handleScreenTitle('State', true)}
                    onFocusStyle={{borderColor: colors.ORANGE}}
                    image={DOWN_ARROW}
                    onPress={getAllState}
                  />
              

              {userState && (
                <StyledTextInput
                  placeholder="LGA"
                  name="lga"
                  editable={false}
                  value={userLga}
                  onChangeText={newLga => setUserLga(newLga)}
                  onBlur={() => handleScreenTitle('More Information', false)}
                  onFocus={() => handleScreenTitle('More Information', true)}
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
              disabled={
                !firstName ||
                !lastName ||
                !mobile ||
                !address ||
                !userLga ||
                !userState
              }
              buttonStyle={undefined}
              textStyle={undefined}
              onPress={updateDeliveryDetails}
            />
          </View>
        </ScrollView>
      </FormMainContainer>

      <Modalize
        ref={modalizeRef}
        modalHeight={350}
        modalStyle={{
          paddingTop: 40,
          paddingBottom: 30,
          backgroundColor: colors.WHITE,
        }}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}>
        <View style={styles.items_container}>
          {allDataGotten.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPressIn={() => setPressedIndex(index)}
              onPressOut={() => setPressedIndex(null)}
              onPress={
                selectedDropdown === 'state'
                  ? () => handleSelectedstate(item)
                  : () => handleSelectedLga(item)
              }
              style={[
                styles.item,
                highlightedIndex === item ? styles.highlightOverlay : null,
              ]}>
              <Fonts
                type="normalGrayText"
                style={[
                  styles.item_text,
                  pressedIndex === index
                    ? styles.pressed_item_text
                    : highlightedIndex === item
                    ? styles.active_item_text
                    : null,
                ]}>
                {item.toUpperCase()}
              </Fonts>
            </TouchableOpacity>
          ))}
        </View>
      </Modalize>
      {showMsg && <CustomToast>{msg}</CustomToast>}
    </>
  );
};

export default AddAddress;
