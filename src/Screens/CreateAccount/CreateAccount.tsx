import React, {FC, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const CreateAccount: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigation.goBack}></TouchableOpacity>
        <Text>Create An Account</Text>
      </View>
    </>
  );
};

export default CreateAccount;
