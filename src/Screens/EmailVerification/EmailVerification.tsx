import React, {FC, useMemo} from 'react';
import {Text, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Buttons from '../../Components/Buttons/Buttons';
import createStyles from './style';
import { SUCCESSS } from '../../Assets/svgImages';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const EmailVerification: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <React.Fragment>
      <View style={styles.container}>
        <SUCCESSS />
        <Text style={styles.title}>Verification Complete</Text>
        <Text style={styles.description}>
          Your email is all verified, now you're set to move on to the next step
          : Business verification. Let's keep this process rolling
        </Text>
        <View style={styles.btn_container}>
          <Buttons
            title="Got it!"
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

export default EmailVerification;
