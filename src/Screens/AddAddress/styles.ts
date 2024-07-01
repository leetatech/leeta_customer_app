import {StyleSheet} from 'react-native';

const createStyles = () =>
  StyleSheet.create({
    main_container: {
      flex: 1,
    },

    form_main_container: {
      paddingTop: 10,
      gap: 5,
    },
    button_container :{
      paddingTop: 15
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      gap: 6,
    },
    listSate :{
 width: '100%',
    gap:8
    },
    stateStyle:{
lineHeight:28,
alignSelf: 'center',
width:100
    }
 
  });

export default createStyles;
