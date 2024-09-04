import React, {FC, useMemo} from 'react';
import {Image, Text, TouchableOpacity, View,TextStyle,} from 'react-native';
import {LEFT_ARROW} from '../../Assets';
import createStyles from './style';

interface IProps {
  screenTitle : string;
  onPress: () => void;
  titleStyle?:TextStyle,
}

const ScreenTitle: FC<IProps> = ({onPress, screenTitle,titleStyle}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <View style={styles.main_container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={LEFT_ARROW} />
      </TouchableOpacity>
      <Text style={[styles.description,titleStyle]}>{screenTitle}</Text>
    </View>
  );
};

export default ScreenTitle;
