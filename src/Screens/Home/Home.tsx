import React, {FC, useMemo, useRef, useState} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import GoogleMap from '../GoogleMap/GoogleMap';
import {View, Text, TextInput} from 'react-native';
import createStyles from './style';
import Buttons from '../../Components/Buttons/Buttons';
import CustomModal from '../../Components/Modal/CustomModal';
import {SvgIcon} from '../../Components/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CANCEL_ICON} from '../../Assets/svgImages';
import {colors} from '../../Constants/Colors';
import KeyboardAvoidingContainer from '../../Components/KeyboardAvoidingContainer';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const weightOptions = ['2 kg', '3 kg', '4 kg', '5 kg', '6 kg', '7 kg', 'Other'];

const Home: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [openGasWeightOptions, setopenGasWeightOptions] = useState(false);
  const [inputWeight, setInputWeight] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOpenWeightOptions = () => {
    setopenGasWeightOptions(true);
  };
  const handleCloseWeightOptions = () => {
    setopenGasWeightOptions(false);
    setInputWeight(false);
  };
  const handleInputWeight = (index: number) => {
    if (index === weightOptions.length - 1) {
      setInputWeight(true);
      // navigation.navigate("AddAddress")
    }
  };

  const handleNavigation = () => {
    navigation.navigate('Cart');
    setopenGasWeightOptions(false);
    
  };

  return (
    <KeyboardAvoidingContainer>
      <View style={styles.mainContainer}>
        <GoogleMap />
        <View style={styles.button_container}>
          <Buttons
            title="Gas refill"
            disabled={false}
            buttonStyle={undefined}
            textStyle={undefined}
            onPress={handleOpenWeightOptions}
          />
        </View>
        <CustomModal visible={openGasWeightOptions}>
          <View style={styles.modal_actions}>
            <TouchableOpacity
              onPress={() => handleInputWeight(weightOptions.length - 1)}>
              <SvgIcon
                size={24}
                fill={inputWeight ? colors.WHITE : colors.GRAY}
                pathData="M10.75 4.75C10.75 4.33579 10.4142 4 10 4C9.58579 4 9.25 4.33579 9.25 4.75V9.25H4.75C4.33579 9.25 4 9.58579 4 10C4 10.4142 4.33579 10.75 4.75 10.75L9.25 10.75V15.25C9.25 15.6642 9.58579 16 10 16C10.4142 16 10.75 15.6642 10.75 15.25V10.75L15.25 10.75C15.6642 10.75 16 10.4142 16 10C16 9.58579 15.6642 9.25 15.25 9.25H10.75V4.75Z"
              />
            </TouchableOpacity>
            <Text style={styles.text_color}>
              {inputWeight ? 'Input Weight' : 'Select Weight'}
            </Text>
            <TouchableOpacity onPress={handleCloseWeightOptions}>
              <CANCEL_ICON />
            </TouchableOpacity>
          </View>
          {inputWeight ? (
            <View style={styles.input_weight_container}>
              <TouchableOpacity
                style={styles.input_weight_and_unit_container}
                onPress={focusInput}>
                <TextInput
                  placeholderTextColor={colors.LGRAY}
                  ref={inputRef}
                  style={styles.input_style}
                />

                <Text style={styles.unit}>Kg</Text>
              </TouchableOpacity>

              <Buttons
                title="Continue"
                disabled={false}
                buttonStyle={undefined}
                textStyle={undefined}
                onPress={handleNavigation}
              />
            </View>
          ) : (
            <View>
              <View style={styles.weight_options_main_container}>
                {weightOptions.map((kg, index) => (
                  <View key={index} style={styles.weight_options_container}>
                    <TouchableOpacity onPress={() => handleInputWeight(index)}>
                      <Text style={styles.text_color}>{kg}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </CustomModal>
        <View />
      </View>
    </KeyboardAvoidingContainer>
  );
};
export default Home;
