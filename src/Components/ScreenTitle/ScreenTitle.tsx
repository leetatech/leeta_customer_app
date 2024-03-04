import React, {FC, useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {LEFT_ARROW} from '../../Assets';
import createStyles from './style';

interface IProps {
  screenTitle : string;
  onPress: () => void;
}

const ScreenTitle: FC<IProps> = ({onPress, screenTitle}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <View style={styles.main_container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={LEFT_ARROW} />
      </TouchableOpacity>
      <Text style={styles.description}>{screenTitle}</Text>
    </View>
  );
};

export default ScreenTitle;
