import React, {FC, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
import {
  DeliveryFeeData,
  deliveryFee,
  getState,
} from '../../redux/slices/order/orderServices';
import {useDispatch, useSelector} from 'react-redux';
import {DOWN_ARROW} from '../../Assets';
import {StateResponse} from '../../redux/slices/order/types';
import CustomModal from '../../Components/Modal/CustomModal';
import {RootState} from '../../redux/rootReducer';
import {
  setUserDeliveryInformation,
  updateUserDeliveryFee,
  updateUserLga,
  updateUserState,
} from '../../redux/slices/order/orderSlice';
import CustomLoader from '../../Components/Loader/CustomLoader';

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
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  const scrollViewRef = useRef(null);
  const highlightPosition = 150;

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

  const handleTextChange = (newMobile: string) => {
    if (/^\+234\d*$/.test(newMobile) && newMobile.length <= 14) {
      setMobile(newMobile);
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
    const selectedState = states.data?.find(state => state.name === item);
    const lgas = selectedState?.lgas;
    setAllDataGotten(lgas!);
    setUserState(item);
    dispatch(updateUserState(item));
    setToggleModal(false);
  };

  const handleSelectedLga = (item: string) => {
    setUserLga(item);
    dispatch(updateUserLga(item));
    setToggleModal(false);
  };

  const getFormattedState = (state: string) => {
    if (!state) return '';
    return state.charAt(0) + state.slice(1).toLowerCase();
  };

  const updateDeliveryDetails = () => {
    const deliveryInfoPayload = {
      contactName: name,
      phoneNumber: mobile,
      address: address,
      userState: userState,
      userLga: userLga,
      additionalInfo: moreInfo,
      isDefault: checked,
    };
    dispatch(setUserDeliveryInformation(deliveryInfoPayload));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      getDeliveryFee();
      navigation.navigate('OrderConfirmation');
    }, 2000);
  };

  const getDeliveryFee = async () => {
    if (!userLga) {
      console.error('userLga is not available');
      return;
    }
    const payload: DeliveryFeeData = {
      filter: {
        fields: [
          {
            name: 'fee_type',
            operator: 'isEqualTo',
            value: 'DELIVERY_FEE',
          },
          {
            name: 'lga',
            operator: 'isEqualTo',
            value: userLga!,
          },
        ],
        operator: 'and',
      },
      paging: {
        index: 0,
        size: 1,
      },
    };
    dispatch(deliveryFee(payload))
      .then(response => {
        console.log('response', response);
        const result = response.payload as any;
        console.log('result', result);

        if (response && result) {
          const feeItem = result.data as any;
          const generateDeliveryFee = feeItem.data!.find(
            (item: {fee_type: string}) => item.fee_type === 'DELIVERY_FEE',
          );
          if (generateDeliveryFee) {
            const deliveryFee = generateDeliveryFee.cost.cost_per_type;
            console.log('deliveryFee', deliveryFee);
            dispatch(updateUserDeliveryFee(deliveryFee));
          } else {
            return null;
          }
        }
      })
      .catch(error => {
        console.error('Error getting delivery fees', error);
      });
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const itemHeight = 40;
    const currentIndex = Math.floor(
      (scrollPosition + highlightPosition) / itemHeight,
    );

    if (currentIndex >= 0 && currentIndex < allDataGotten.length) {
      setHighlightedIndex(currentIndex);
    } else {
      setHighlightedIndex(null);
    }
  };

  return (
    <>
      <FormMainContainer>
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <ScreenTitle screenTitle={screenTitle} onPress={navigation.goBack} />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              {loading && <CustomLoader />}

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
                onChangeText={handleTextChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
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
              disabled={!name || !mobile || !address || !userLga || !userState}
              buttonStyle={undefined}
              textStyle={undefined}
              onPress={updateDeliveryDetails}
            />
          </View>
        </ScrollView>
      </FormMainContainer>
      <CustomModal visible={toggleModal} style={styles.modal_container}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.items_container}>
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
              style={styles.item}>
              <Fonts
                type="normalGrayText"
                style={[styles.item_text,
                  pressedIndex === index
                    ? styles.pressed_item_text
                    : highlightedIndex === index
                    ? styles.active_item_text
                    : null
                ]}>
                {item.toUpperCase()}
              </Fonts>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF']}
          style={styles.overlayTop}
        />
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF']}
          style={styles.overlayBottom}
        />
        <View style={styles.highlightOverlay} />
      </CustomModal>
    </>
  );
};

export default AddAddress;
