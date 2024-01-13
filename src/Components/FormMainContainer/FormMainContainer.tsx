
import React, {FC, useMemo, ReactNode} from 'react';
import createStyles from './styles';
import {View} from 'react-native';


interface ContainerProps {
     children: ReactNode;
}


const FormMainContainer: FC<ContainerProps> = (props) => {
  const styles = useMemo(() => createStyles(), []);
  return (
     <View style={styles.container}>{props.children}</View>



  )
};

export default FormMainContainer;