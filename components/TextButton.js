import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS } from '../constants';


const TextButton = ({
    label,
    label2 = '',
    labelStyle2,
    labelStyle,
    buttonContainerStyle,
    onPress,
    disabled,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary,
          ...buttonContainerStyle,
        }}>
        <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>
          {label}
        </Text>
        {label2 != '' && (
          <Text
            style={{ flex: 1, textAlign: 'right', ...FONTS.h3, ...labelStyle2 }}>
            {label2}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  
  export default TextButton;