import {StyleSheet} from 'react-native';
import { colors } from '../../Constants/Colors';
const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor:colors.WHITE,
      gap: 10,
     height:20,
      flex:1,
      paddingVertical:30,
    paddingHorizontal:20,
    paddingTop:70,
    },
    welcomeText: {
      fontSize: 23,
      fontWeight: 'bold',
      paddingTop: 8,
      color: colors.BLACK
    },
    profile_container :{
      flexDirection:'row',
      gap:15
    },
    dashboard :{
      marginTop:5,
    },
    open_navigation_container :{
      flexDirection:'row',
justifyContent:'space-between'
    }
  });

export default createStyles;