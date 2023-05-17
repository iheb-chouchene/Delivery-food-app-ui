import React, { useEffect } from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from '../constants';
import { images } from '../constants';



const Splash = ({navigation}) => {
    useEffect(() =>{
        setTimeout(() => {
            navigation.navigate('Onboarding')
        }, 3000);
    }, [])
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent
      />
      <Image source={images.logo} resizeMode="contain" style={styles.image} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  image: {
    height: 130,
    width: 160,
  },

});

export default Splash;