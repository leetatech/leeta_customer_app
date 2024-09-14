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
  onChangeText,
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          inputStyle,
          errors && isFocused ? styles.errorStyle : null,
          isFocused && onFocusStyle,
          isFocused && !errors ? styles.focusStyle : null,
        ]}>
        {icon}
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          placeholderTextColor={colors.LGRAY}
          style={[styles.textInput, defaultValueStyle]}
          {...props}
        />
        {image && (
          <TouchableOpacity onPress={onPress}>
            <Image source={image} />
          </TouchableOpacity>
        )}
      </View>
      {errors && isFocused && <Text style={styles.errorMsg}>{helperText}</Text>}
    </View>
  );
};

export default StyledTextInput;
