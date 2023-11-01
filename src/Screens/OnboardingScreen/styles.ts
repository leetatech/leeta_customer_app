import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    largeText: {
      fontWeight: '600',
      color: colors.BLACK,
    },
    body: {
      flex: 1,
      
      justifyContent: 'center',
      alignItems: 'center',
    },
    description :{
      alignSelf:'center'
    },
    sub_container:{
      paddingBottom:50
    }
  });

export default createStyles;
