import {StyleSheet} from 'react-native';

const createStyles = () =>
  StyleSheet.create({
    mainContainer:{
     justifyContent: 'center',
     alignItems: 'center',
    },
    spinner_container:{
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     justifyContent: 'center',
     alignItems: 'center',
    }
   
  });

export default createStyles;