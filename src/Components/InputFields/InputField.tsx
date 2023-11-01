import React, {FC, useMemo} from 'react';
import {SafeAreaView, Text, ScrollView, View, TextInput} from 'react-native';
import createStyles from './styles';

interface FormProps {
  placeholder?: string;
  value: string;
  onChangeText?: () => void;
  error:string
}

const InputField: FC<FormProps> = ({placeholder, value, onChangeText, error}) => {
  const styles = useMemo(() => createStyles(), []);
  
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            value={value}
            placeholder={placeholder}
            onChange={onChangeText}
            style={styles.input}
          />
          <Text style={styles.error}>{error}</Text>
        </View>
        
      </SafeAreaView>
    </ScrollView>
  );
};

export default InputField;
