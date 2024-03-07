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
  defaultValueStyle,
  onFocus,
  ...props
}) => {
  const styles = useMemo(() => createStyles(), []);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.input, inputStyle]}>
        {icon}
        <TextInput
          onFocus={handleFocus}
          placeholderTextColor={colors.LGRAY}
          style={defaultValueStyle}
          {...props}
        />
      </View>
    </View>
  );
};

export default StyledTextInput;
