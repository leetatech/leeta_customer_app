import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';
let height = Dimensions.get('window').height
let width = Dimensions.get('window').width;


const createStyles = () =>
  StyleSheet.create({
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom:50,
      width:'100%'
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.BLACK,
      textAlign:'center',
      
    },
    description: {
      color: colors.GRAY,
      textAlign:'center',
    },
    description_container:{
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center',
      width:'80%',
      height:70,
      gap: 4,
      paddingBottom:20,
    },
    button_container: {
      width: '100%',
      padding: 10,
      paddingBottom: 40,
    },
    existing_user: {
      color: colors.ORANGE,
      fontWeight: 'bold',
      fontSize: 15,
      alignSelf: 'center',
      paddingTop: 5,
    },
    boy: {
      width: 400,
      height: height - 360,
    },
    image_container: {
      flex: 1,
    },
    skip:{
      color:colors.ORANGE,
      fontWeight: 'bold',
      alignSelf: 'center',
    }
  });

export default createStyles;
