import React, {FC, ReactNode, useEffect, useMemo, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, View} from 'react-native';
import Modal from 'react-native-modal';
import createStyles from './style';

interface CustomModalProps {
  visible: boolean;
  children: ReactNode;
}

const CustomModal: FC<CustomModalProps> = ({visible, children}) => {
  const styles = useMemo(() => createStyles(), []);
  const [modalPosition, setModalPosition] = useState('bottom');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setModalPosition('top'),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setModalPosition('bottom'),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View>
      <Modal isVisible={visible} propagateSwipe={true} style={styles.modal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <View style={styles.children_container}>{children}</View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default CustomModal;
