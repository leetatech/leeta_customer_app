import React, {ReactNode} from 'react';
import {TextInputProps} from 'react-native';

interface ExtraInputProps {
  label: ReactNode;
  isPassword?: boolean;
  name: string;
  errors?: ReactNode;
  icon?: React.ReactNode;
  helperText: string;
}

export type InputProps = TextInputProps & ExtraInputProps;
