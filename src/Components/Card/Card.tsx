import React, {FC, useMemo} from 'react';
import {View} from 'react-native';
import createStyles from './styles';

interface CardProp {
  children?: React.ReactNode;
}
const Card: FC<CardProp> = ({children}) => {
  const styles = useMemo(() => createStyles, []);
  return <View style={styles.card}>{children}</View>;
};

export default Card;
