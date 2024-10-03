import React, {FC} from 'react';
import {View, TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import Fonts from '../../Constants/Fonts';
interface IProps {
  onPress: () => void;
  text: string;
  viewStyle: StyleProp<ViewStyle>;
}

const Tabs: FC<IProps> = ({onPress, text, viewStyle}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[viewStyle]}>
        <View>
          <Fonts type="boldBlack">{text} </Fonts>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Tabs;
