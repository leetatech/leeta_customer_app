import React, {FC, ReactNode} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

interface KeyboardAvoidingProps {
  children: ReactNode;
}

const KeyboardAvoidingContainer: FC<KeyboardAvoidingProps> = ({children}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingContainer;
