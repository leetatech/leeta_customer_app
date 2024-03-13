import React, {ReactNode} from 'react';
import {StyleProp, TextInputProps,  TextStyle,  ViewStyle,
} from 'react-native';

interface ExtraInputProps {
  label?: ReactNode;
  isPassword?: boolean;
  name: string;
  errors?: ReactNode;
  icon?: React.ReactNode;
  helperText?: string;
  inputStyle?: StyleProp<ViewStyle>;
  onFocusStyle?: StyleProp<ViewStyle>;
  defaultValueStyle?: StyleProp<TextStyle>;
  onFocus?: () => void,
  onBlur?: () => void
}

export type InputProps = TextInputProps & ExtraInputProps;
