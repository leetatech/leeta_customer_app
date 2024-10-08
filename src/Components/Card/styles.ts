import { StyleSheet } from "react-native";
import { colors } from "../../Constants/Colors";

const createStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.WHITE,
      padding: 10,
      margin: 10,
      shadowColor: colors.LGRAY,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  export default createStyles;