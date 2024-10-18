import React, {FC, useMemo} from 'react';

import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';

import createStyles from './styles';
import {colors} from '../../Constants/Colors';

interface IProps {
  title: string;
  onPress?: () => void;
  onPress2?: () => void;
  disabled?: boolean;
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  text?: string;
  text2?: string;
}

const Buttons: FC<IProps> = ({
  title,
  onPress,
  disabled,
  buttonStyle,
  textStyle,
  text,
  text2,
  onPress2,
}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: disabled ? colors.LGRAY : colors.ORANGE,
          },
          buttonStyle,
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>

      {text && (
        <Text style={styles.textStyle}>
          {text}
          {text2 && (
            <Text style={styles.coloredText} onPress={onPress2}>
              {text2}
            </Text>
          )}
        </Text>
      )}
    </View>
  );
};

export default Buttons;

export const OrderButtons: FC<IProps> = ({
  title,
  onPress,
  disabled,
  buttonStyle,
  textStyle,
  text,
  text2,
}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <View>
      <TouchableOpacity
        style={[styles.order_button, buttonStyle]}
        onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>

      <Text style={styles.textStyle}>
        {text}
        <Text style={styles.coloredText} onPress={onPress}>
          {text2}
        </Text>
      </Text>
    </View>
  );
};

export const ButtonsOutline: FC<IProps> = ({
  title,
  onPress,
  disabled,
  buttonStyle,
  textStyle,
  text,
  text2,
  onPress2,
}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
