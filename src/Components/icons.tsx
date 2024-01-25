import React, {FC} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IconProps {
  size: number;
  fill: string;
  pathData: string;
}

export const SvgIcon: FC<IconProps> = ({fill, size, pathData}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 22" fill="none">
      <Path d={pathData} fill={fill} />
    </Svg>
  );
};
