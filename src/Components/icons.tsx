import React, {FC} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IconProps {
  size: number;
  fill: string;
  pathData: string;
  style?: any;
}

export const SvgIcon: FC<IconProps> = ({fill, size, pathData,style}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 22" fill="none" style={[style]}>
      <Path d={pathData} fill={fill} />
    </Svg>
  );
};
