import React, {FC, useMemo} from 'react';
import createStyles from './styles';
import {View, Text} from 'react-native';

interface TextProps {
  bigText: string;
  smallText: string;
}

const FormTexts: FC<TextProps> = ({bigText, smallText}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.container}>
      <Text style={styles.big_text}>{bigText}</Text>
      <Text style={styles.small_text}>{smallText}</Text>
    </View>
  );
};

export default FormTexts;
