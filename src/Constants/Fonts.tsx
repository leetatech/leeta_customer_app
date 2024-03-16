import React, {FC, useMemo} from 'react';
import {Text, StyleProp, TextStyle } from 'react-native';
import createStyles from './style';

interface FontProps {
     style?: StyleProp<TextStyle>;
     type?: 'boldLightGray' | 'semiBoldBlack' | 'boldBlack' | 'normalGrayText' | 'normalBlackText'| 'normalText'| 'smallText';
     children: React.ReactNode;
}

const Fonts: FC<FontProps> = ({style, type = 'normal_gray_text', children }) => {
  const styles = useMemo(() => createStyles(), []);

  const getFontStyle = (): StyleProp<TextStyle> => {
     switch (type) {
       case 'bold_light_gray':
         return styles.bold_light_gray;
       case 'semiBoldBlack':
         return styles.semi_bold_black;
       case 'boldBlack':
         return styles.bold_black;
       case 'normalGrayText':
        return styles.normalGrayText;
        case 'normalBlackText':
          return styles.normalBlackText;
          case 'smallText':
          return styles.small_text;
          case 'normalText' :
            return styles.normalText
       default:
         return styles.normalGrayText;
     }
   };
   return <Text style={[getFontStyle(), style]}>{children}</Text>;
};

export default Fonts;
