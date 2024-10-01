import React, {FC, useMemo} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {NAVIGATOR} from '../../Assets/svgImages';
import ShadowNavBar from '../../Components/NavBar/ShadowNavBar';
import createStyles from './styles';
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const Orders: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <ShadowNavBar
      text="All Orders"
      onPress={navigation.goBack}
      size={34}
      fill="#EAECF0"
      pathData="M14.5 21L11 17M11 17L14.5 13M11 17H24"
      imageSrc={NAVIGATOR}
    />
  );
};

export default Orders;
