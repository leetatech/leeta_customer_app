import React, {FC, useMemo} from 'react';
import {Text, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Buttons from '../../Components/Buttons/Buttons';
import createStyles from './style';
import { SUCCESS } from '../../Assets/svgImages';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const PasswordCreated: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <React.Fragment>
      <View style={styles.container}>
        <SUCCESS />
        <Text style={styles.title}>New Password Created</Text>
        <Text style={styles.description}>
          Your new password has been successfully created
          Click below to log in with the new password
        </Text>
        <View style={styles.btn_container}>
          <Buttons
            title="Back to Log in!"
            disabled={false}
            buttonStyle={undefined}
            textStyle={undefined}
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default PasswordCreated;
