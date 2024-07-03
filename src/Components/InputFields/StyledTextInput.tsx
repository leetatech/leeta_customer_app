import React, {FC, useMemo, useState} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import createStyles from './styles';
import {InputProps} from './InputFieldTypes';
import {colors} from '../../Constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StyledTextInput: FC<InputProps> = ({
  label,
  icon,
  image,
  name,
  errors,
  helperText,
  inputStyle,
  onFocusStyle,
  defaultValueStyle,
  onPress,
  onFocus,
  onBlur,
  ...props
}) => {
  const styles = useMemo(() => createStyles(), []);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.input, inputStyle, isFocused && onFocusStyle]}>
        {icon}
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.LGRAY}
          style={defaultValueStyle}
          {...props}
        />

        {image && (
          <TouchableOpacity onPress={onPress}>
            <Image source={image} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default StyledTextInput;
