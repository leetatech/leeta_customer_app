import React, {FC, useMemo} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import createStyles from './styles';
import ShadowCard from '../../Components/ShadowCard/ShadowCard';
import {EDIT_PROFILE, NAVIGATION_ARROW, RIGHT_ARROW} from '../../Assets';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../Constants/Colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const AccountSettings: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <React.Fragment>
      <ShadowCard
        text="Settings"
        imageSrc={NAVIGATION_ARROW}
        alt="icon"
        onPress={navigation.goBack}
      />
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={EDIT_PROFILE} alt="icon" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Daniel Tesfaye</Text>
          <Text style={styles.description}>Abeltesfaye@Gmail.com</Text>
        </View>
        <View style={styles.settings_options_container}>
          <TouchableOpacity
            style={styles.logout_container}
            onPress={() => navigation.navigate('SignIn')}>
            <FontAwesome name="sign-out" size={24} color={colors.LIGHT_RED} />
            <Text style={styles.logout}>Log out</Text>
          </TouchableOpacity>
          <Image source={RIGHT_ARROW} alt="icon" />
        </View>
      </View>
    </React.Fragment>
  );
};

export default AccountSettings;
