import React, {FC, useMemo} from 'react';
import {
  Image,
  Text,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import createStyles from './styles';

interface IProps {
  text: string;
  imageSrc: ImageSourcePropType;
  alt: string;
  onPress?: () => void;
}

const ShadowCard: FC<IProps> = ({text, imageSrc, alt, onPress}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.order_card}>
      <View style={styles.img}>
        <TouchableOpacity onPress={onPress} >
          <Image source={imageSrc} alt={alt} />
          {/* {imageSrc} */}
        </TouchableOpacity>
      </View>

      <Text style={styles.screen_title}>{text}</Text>
    </View>
  );
};

export default ShadowCard;
