import React, {FC, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import createStyles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Svg, Path} from 'react-native-svg';

interface IProps {
  text?: string;
  imageSrc?: React.ComponentType<any>;
  onPress?: () => void;
  size?: number;
  fill?: string;
  pathData?: string;
}
const ShadowNavBar: FC<IProps> = ({
  text,
  size,
  fill,
  pathData,
  onPress,
  imageSrc: ImageComponent,
}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <SafeAreaView style={styles.nav_card}>
      <View>
        <TouchableOpacity onPress={onPress}>
          {ImageComponent ? (
            <ImageComponent />
          ) : (
            <Svg width={size} height={size} viewBox="0 0 26 22" fill="none">
              <Path d={pathData} fill={fill} />
            </Svg>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.screen_title}>{text}</Text>
    </SafeAreaView>
  );
};

export default ShadowNavBar;
