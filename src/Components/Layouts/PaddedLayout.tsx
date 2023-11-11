import React, {FC, useMemo, ReactNode} from 'react';
import {View} from 'react-native';
import createStyles from './styles';

interface ContainerProps {
     children: ReactNode;
}

const FormMainContainer: FC<ContainerProps> = (props) => {
  const styles = useMemo(()=> createStyles(), [])
  return (
     
     <View style={styles.container}>{props.children}</View>

  )
};

export default FormMainContainer;