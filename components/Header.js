import React from 'react';
import { View, Text, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { FONTS } from '../constants';



const Header = ({ containerStyle, title, leftComponent, rightComponent}) => {

  return (
    <View style={{ ...containerStyle }}>
      {/* Left */}
      {leftComponent}
      {/* Title */}
      <View style={styles.containerTitle}>
        <Text style={[{ ...FONTS.h3, color: 'black' }]}>
          {title}
        </Text>
      </View>
      {/* Right */}
      {rightComponent}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
});

