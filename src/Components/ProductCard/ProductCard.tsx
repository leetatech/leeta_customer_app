import React, {FC, useMemo} from 'react';
import {
  Text,
  View,
  Image,
  ImageSourcePropType,
  TextStyle,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import createStyles from './styles';

interface IProps {
  imageSrc: ImageSourcePropType;
  imageSrc2: ImageSourcePropType;
  alt: string;
  cylinderDescription: string;
  dateOrdered: string;
  status: string;
  onPress: () => void;
  textStyle: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}

const ProductCard: FC<IProps> = ({
  imageSrc,
  imageSrc2,
  alt,
  cylinderDescription,
  dateOrdered,
  status,
  textStyle,
  viewStyle,
  onPress,
}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {flexDirection: 'row', justifyContent: 'space-between'},
          viewStyle,
        ]}>
        <View style={[{flexDirection: 'row', gap: 10}]}>
          <Image source={imageSrc} alt={alt} style={styles.image} />
          <View style={[{flexDirection: 'column', gap: 4}]}>
            <Text style={styles.cylinder_description}>
              {cylinderDescription}
            </Text>
            <Text style={styles.date}>{dateOrdered}</Text>
            <Text style={[styles.order_status, textStyle]}>{status}</Text>
          </View>
        </View>
        <Image source={imageSrc2} alt={alt} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
