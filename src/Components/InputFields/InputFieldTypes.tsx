import React, {ReactNode} from 'react';
import {StyleProp, TextInputProps,  ViewStyle,
} from 'react-native';

interface ExtraInputProps {
  label: ReactNode;
  isPassword?: boolean;
  name: string;
  errors?: ReactNode;
  icon?: React.ReactNode;
  helperText: string;
  inputStyle?: StyleProp<ViewStyle>;

}

export type InputProps = TextInputProps & ExtraInputProps;
