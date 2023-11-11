import React, {FC, useMemo} from 'react';
import {Text, TextInput, View} from 'react-native';
import createStyles from './styles';
import {InputProps} from './InputFieldTypes';
import {colors} from '../../Constants/Colors';

const StyledTextInput: FC<InputProps> = ({
  label,
  icon,
  name,
  errors,
  helperText,
  ...props
}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        {icon}
        <TextInput placeholderTextColor={colors.LGRAY} {...props} />
      </View>
    </View>
  );
};

export default StyledTextInput;
