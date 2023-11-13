import React, {FC, ReactNode, useMemo} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../Constants/Colors';
import createStyles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { CLOSE_INFO, INFO_CIRCLE } from '../../Assets/svgImages';

interface CustomModalProps {
  children: ReactNode;
  onPress?: () => void;
}

const CustomToast: FC<CustomModalProps> = ({children, onPress}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.message_container}>
          <INFO_CIRCLE />
          <Text style={{color: colors.GRAY}}>{children}</Text>
          <TouchableOpacity onPress={onPress}>
            <CLOSE_INFO />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomToast;
