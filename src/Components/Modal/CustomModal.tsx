import React, {FC, ReactNode, useMemo} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import createStyles from './style';

interface CustomModalProps {
  visible: boolean;
  children: ReactNode;
}

const CustomModal: FC<CustomModalProps> = ({visible, children}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View>
      <Modal isVisible={visible} propagateSwipe={true} style={styles.modal}>
        <View style={styles.container}>{children}</View>
      </Modal>
    </View>
  );
};

export default CustomModal;
