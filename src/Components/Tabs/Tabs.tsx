import React, {FC, useState, useMemo} from 'react';
import {Text, View, TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import createStyles from './styles';
interface IProps {
  onPress: () => void;
  text: string;
  viewStyle: StyleProp<ViewStyle>;
}

const Tabs: FC<IProps> = ({onPress, text, viewStyle}) => {
  const styles = useMemo(() => createStyles(), []);
  const [isActive, setIsActive] = useState(false);
  const toggleView = () => {
    setIsActive(!isActive);
  };
  return (
      <View >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={[viewStyle]}>
          <View>
            <Text style={styles.order_title}>{text} </Text>
          </View>
        </TouchableOpacity>
       
      </View>

  );
};
export default Tabs;