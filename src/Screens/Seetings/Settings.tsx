import React, {FC, useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import createStyles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../Constants/Colors';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {AVATAR, RIGHT_ICON} from '../../Assets/svgImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../Components/Buttons/Buttons';
import Fonts from '../../Constants/Fonts';
import Modal from 'react-native-modal';
import CustomLoader from '../../Components/Loader/CustomLoader';
import ShadowCard from '../../Components/ShadowCard/ShadowCard';
import {NAVIGATION_ARROW} from '../../Assets';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Settings: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [status, setStatus] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loader, setLoader] = useState(false);

  const checkUserStatus = async () => {
    try {
      const checkTokenAvaibility = await AsyncStorage.getItem(
        'userInformation',
      );
      const checkDetails =
        checkTokenAvaibility !== null ? JSON.parse(checkTokenAvaibility) : null;
      if (checkDetails) {
        const getUserFirstName = checkDetails.body.first_name;
        const getUserLastName = checkDetails.body.last_name;
        setFullName(getUserFirstName + ' ' + getUserLastName);
        const getEmail = checkDetails.body.email.address;
        console.log('****', getEmail);
        setEmail(getEmail);
        if (getUserFirstName !== null) {
          setStatus('Log Out');
        } else {
          setStatus('Sign In');
        }
      }
    } catch (error) {
      console.error('Error parsing JSON or retrieving data: ', error);
    }
  };

  const handleLogoutAndLogin = async () => {
    try {
      await AsyncStorage.removeItem('userInformation');
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setConfirmLogout(false);
        navigation.navigate('SignIn');
      }, 2000);
    } catch (error) {
      console.error('Error removing user information: ', error);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);
  return (
    <React.Fragment>
      <ShadowCard
        text="Settings"
        imageSrc={NAVIGATION_ARROW}
        alt="icon"
        onPress={navigation.goBack}
      />
      <FormMainContainer>
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
              onPress={() => setConfirmLogout(true)}>
              <FontAwesome
                name={status === 'Sign In' ? 'sign-in' : 'sign-out'}
                size={24}
                color={status === 'Sign In' ? colors.ORANGE : colors.LIGHT_RED}
              />
              <Text style={status === 'Sign In' ? styles.login : styles.logout}>
                {status}
              </Text>
            </TouchableOpacity>

            <RIGHT_ICON />
          </View>
        </View>
      </FormMainContainer>
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
              onPress={handleLogoutAndLogin}
              title="Log out"
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default Settings;
