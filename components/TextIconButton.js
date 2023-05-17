import React from 'react';
import {
  ViewStyle,
  ImagePropTypes,
  TouchableOpacity,
  Image,
  Text,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import { COLORS, FONTS } from '../constants';


const TextIconButton = ({
    containerStyle,
    icon,
    iconStyle,
    label,
    labelStyle,
    onPress,
    iconPosition,
  }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          ...containerStyle,
        }}
        onPress={onPress}>
        {iconPosition === 'LEFT' && (
          <Image
            source={icon}
            style={{
              ...styles.image,
              ...iconStyle,
            }}
          />
        )}
        <Text style={{ ...FONTS.body3, ...labelStyle }}>{label}</Text>
        {/* <Image
          source={icon}
          style={{
            ...iconStyle,
          }}
        /> */}
        {iconPosition === 'RIGHT' && (
          <Image
            source={icon}
            style={{
              ...styles.image,
              ...iconStyle,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    image: {
      width: 20,
      height: 20,
      tintColor: COLORS.black,
      marginLeft: 5,
    },
  });
  
  export default TextIconButton;