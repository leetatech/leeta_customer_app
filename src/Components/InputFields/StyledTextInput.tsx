import React, {FC, useMemo, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import createStyles from './styles';
import {InputProps} from './InputFieldTypes';
import {colors} from '../../Constants/Colors';

const StyledTextInput: FC<InputProps> = ({
  label,
  icon,
  name,
  errors,
  helperText,
  inputStyle,
  onFocusStyle,
  defaultValueStyle,
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
      </View>
    </View>
  );
};

export default StyledTextInput;
