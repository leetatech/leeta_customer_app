import React, {FC, useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import createStyles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../Constants/Colors';
import {AVATAR, NAVIGATOR, RIGHT_ICON} from '../../Assets/svgImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../Components/Buttons/Buttons';
import Fonts from '../../Constants/Fonts';
import Modal from 'react-native-modal';
import CustomLoader from '../../Components/Loader/CustomLoader';
import ShadowNavBar from '../../Components/NavBar/ShadowNavBar';
import useUserType from '../../redux/manageUserType/userType';
import { user } from '../../redux/manageUserType/checkUserType';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Settings: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userInformation, setUserInformation] = useState<string | null>(null);  const userType = useUserType();

  const checkUserStatus = async () => {
    try {
      const checkTokenAvaibility = await AsyncStorage.getItem(
        'userInformation',
      );
      setUserInformation(checkTokenAvaibility)
      const checkDetails =
        checkTokenAvaibility !== null ? JSON.parse(checkTokenAvaibility) : null;
      if (checkDetails) {
        const getUserFirstName = checkDetails.body.first_name;
        const getUserLastName = checkDetails.body.last_name;
        setFullName(getUserFirstName + ' ' + getUserLastName);
        const getEmail = checkDetails.body.email.address;
        setEmail(getEmail);
      }
    } catch (error) {
      console.error('Error parsing JSON or retrieving data: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInformation');
      await AsyncStorage.removeItem('userAddress');
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setConfirmLogout(false);
      }, 2000);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error removing user information: ', error);
    }
  };

  const handleReisteredUser = () => {
    setConfirmLogout(true);
  };

  const handleGuestUser = () => {
    navigation.navigate('SignIn');
  };

  const handleUsers = () => {
    if (userType === user.registered) {
      handleReisteredUser();
    } else if (userType === user.guest || userInformation === null) {
      handleGuestUser();
    }
  };

  useEffect(() => {
    if (userType === user.registered) {
      checkUserStatus();
    }
  }, [userType, userInformation]);
  return (
    <React.Fragment>
      <ShadowNavBar
        text="Settings"
        onPress={navigation.goBack}
        size={34}
        fill="#EAECF0"
        pathData="M14.5 21L11 17M11 17L14.5 13M11 17H24"
        imageSrc={NAVIGATOR}
      />
      <View style={styles.container}>
        <TouchableOpacity>
          <AVATAR />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{fullName}</Text>
          <Text style={styles.description}>{email}</Text>
        </View>
        <View style={styles.settings_options_container}>
          <TouchableOpacity
            style={styles.logout_container}
            onPress={handleUsers}>
            <FontAwesome
              name={userType === user.guest || userInformation === null ? 'sign-in' : 'sign-out'}
              size={24}
              color={
                userType === user.guest || userInformation === null ? colors.ORANGE : colors.LIGHT_RED
              }
            />
            <Text
              style={userType === user.guest || userInformation === null ? styles.login : styles.logout}>
              {userType === user.guest || userInformation === null ? 'Login' : 'Logout'}
            </Text>
          </TouchableOpacity>

          <RIGHT_ICON />
        </View>
      </View>
      <Modal
        isVisible={confirmLogout}
        propagateSwipe={true}
        style={{margin: 0}}>
        <View style={styles.modal_container}>
          {loader && <CustomLoader />}
          <View style={styles.modal_title}>
            <Fonts type="boldBlack" style={styles.line_height}>
              Log Out
            </Fonts>
            <Fonts type="extraSmallText">
              Are you sure you want to Log out?
            </Fonts>
          </View>
          <View style={styles.btn_container}>
            <Buttons
              disabled={false}
              buttonStyle={styles.transparent_btn}
              textStyle={styles.transparent_btn_text}
              onPress={() => setConfirmLogout(false)}
              title="Cancel"
            />
            <Buttons
              disabled={false}
              buttonStyle={styles.btn}
              textStyle={styles.btn_text}
              onPress={handleLogout}
              title="Log out"
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default Settings;
