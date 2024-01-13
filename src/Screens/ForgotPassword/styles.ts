import { StyleSheet } from 'react-native';

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 19,
    },
    buttonContainer: {
      marginTop: 20,
      paddingBottom: 20,
      paddingTop: 20,
    },
    mainContainer: {
      flex: 1,
    },
  });

export default createStyles;
