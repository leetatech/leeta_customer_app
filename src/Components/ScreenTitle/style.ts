import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
     main_container: {
          flexDirection: 'row',
           alignItems: 'center',
           paddingVertical: 10
        },
    description: {
      textAlign: 'center',
      color: colors.GRAY,
      fontSize: 17,
      flex: 1, 
    },
  
  
   
   
  });

export default createStyles;