import React from 'react';
import { Image, ImageProps } from 'react-native';

const UIImage: React.FC<ImageProps> = props => {
  return <Image resizeMode="contain" {...props} />;
};

export default UIImage;
