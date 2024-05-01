import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../Constants/Colors';
let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;

const isSmallDevice = screenWidth < 380;

const createStyles = () =>
  StyleSheet.create({
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: isSmallDevice ? 16 : 20,
      fontWeight: '600',
      color: colors.BLACK,
      textAlign: 'center',
    },

    description: {
      color: colors.GRAY,
      textAlign: 'center',
    },
    description_container: {
      textAlign: 'center',
      width: isSmallDevice ? '100%' : '70%',
      gap: 6,
      marginTop: isSmallDevice ? 20 : 50,
      overflow: 'scroll',
    },
    button_container: {
      width: '100%',
      paddingHorizontal: 10,
      paddingBottom: screenHeight * 0.04,
    },

    image: {
      width: '100%',
      height: '75%',
    },
    image_container: {
      flex: 1,
    },
    skip: {
      color: colors.ORANGE,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });

export default createStyles;
