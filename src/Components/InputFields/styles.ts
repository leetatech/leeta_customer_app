import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      padding: 2,
    },
    errorMsg: {
      color: colors.RED,
      paddingTop: 4,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.LGRAY,
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.LGRAY,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6, 
      paddingVertical:13,
      justifyContent: 'space-between',
    },
    errorStyle:{
      borderWidth: 1,
      borderColor: colors.RED
      
    },
    focusStyle:{
      borderWidth: 1,
      borderColor: colors.ORANGE
      
    },

    textInput: {
      flex: 1, 
      fontSize: 16,
      fontWeight: '500',
      paddingHorizontal: 8,
      color: colors.GRAY, 
    },
 

  });

export default createStyles;