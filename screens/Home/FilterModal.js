import React, {  useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  Platform,
} from 'react-native';
import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  dummyData,
  constants,
} from '../../constants';
import {IconButton, TextButton, TwoPointSlider, TextIconButton}  from '../../components';

import { firebase } from '../../Firebase/FirebaseConfig'

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
      <Text style={{ ...FONTS.h3, color: 'black' }}>{title}</Text>
      {children}
    </View>
  );
};


const FilterModal = ({
  isVisible,
  onClose,
}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilter] = useState(isVisible);
  const [deliveryTime, setDeliveryTime] = useState('1');
  const [ratings, setRatings] = useState('4');
  const [tags, setTags] = useState('1');

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - SIZES.height * 0.85],
  });

  // Use Firebase to store data
  const saveFilter = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${userId}/filters`).set({
      deliveryTime,
      ratings,
      tags,
    });
  };

  const renderDistance = () => {
    const [distance, setDistance] = useState([3, 10]);

    useEffect(() => {
      const distanceRef = firebase.database().ref('distance');
      distanceRef.on('value', snapshot => {
        const data = snapshot.val();
        setDistance(data || [3, 10]);
      });
    
      return () => distanceRef.off();
    }, []);
    
    return (
      <Section title={'Distance'}>
        <View style={{ alignItems: 'center' }}>
          <TwoPointSlider
            values={distance}
            min={1}
            max={20}
            postfix={'km'}
            onValuesChange={values => firebase.database().ref('distance').set(values)}
          />
        </View>
      </Section>
    );
    
  };

  const renderDeliveryTime = () => {
    const [deliveryTime, setDeliveryTime] = useState(1);
  
    const updateDeliveryTime = (id) => {
      setDeliveryTime(id);
      db.collection('deliveryTimes').doc('current').set({id: id});
    };
  
    useEffect(() => {
      const unsubscribe = db.collection('deliveryTimes').doc('current').onSnapshot((doc) => {
        if (doc.exists) {
          setDeliveryTime(doc.data().id);
        }
      });
  
      return unsubscribe;
    }, []);
  
    return (
      <Section title={'Delivery Time'} containerStyle={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: SIZES.radius,
          }}>
          {constants.delivery_time.map((item, index) => {
            return (
              <TextButton
                key={`delivery-time-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == deliveryTime ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  width: '30%',
                  height: 50,
                  margin: 5,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                onPress={() => updateDeliveryTime(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  };
  
 
      const renderPricingRange = () => {
       
          const [values, setValues] = useState([10, 50]);
        
          useEffect(() => {
            const unsubscribe = db
              .collection('pricingRange')
              .doc('sliderValues')
              .onSnapshot(doc => {
                if (doc.exists) {
                  setValues(doc.data().values);
                }
              });
        
            return unsubscribe;
          }, []);
        
          const handleValuesChange = values => {
            setValues(values);
            db.collection('pricingRange').doc('sliderValues').set({ values });
          };
        
          return (
            <Section title={'Pricing Range'}>
              <View style={{ alignItems: 'center' }}>
                <TwoPointSlider
                  values={values}
                  min={1}
                  max={100}
                  prefix="$"
                  postfix=""
                  onValuesChange={handleValuesChange}
                />
              </View>
            </Section>
          );
       
      };

      const renderRatings = () => {
        
          const [ratings, setRatings] = useState(0);
        
          const handleRatingPress = (item) => {
            // Store the user's ratings in Firebase
            database.ref('ratings').push({
              label: item.label,
              id: item.id,
            });
        
            // Update the state
            setRatings(item.id);
          };
        
          return (
            <Section
              title={'Ratings'}
              containerStyle={{
                marginTop: 40,
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {constants.ratings.map((item, index) => {
                  return (
                    <TextIconButton
                      key={`Ratings-${index}`}
                      label={item.label}
                      iconPosition="LEFT"
                      labelStyle={{
                        color: item.id == ratings ? COLORS.white : COLORS.gray,
                      }}
                      icon={icons.star}
                      iconStyle={{
                        tintColor: item.id == ratings ? COLORS.white : COLORS.gray,
                      }}
                      containerStyle={{
                        flex: 1,
                        height: 50,
                        margin: 5,
                        alignItems: 'center',
                        borderRadius: SIZES.base,
                        backgroundColor:
                          item.id == ratings ? COLORS.primary : COLORS.lightGray2,
                      }}
                      onPress={() => handleRatingPress(item)}
                    />
                  );
                })}
              </View>
            </Section>
          );
       
        
      };

      const renderTags = () => {
   
          const [tags, setTags] = useState(0);
        
          const handleTagPress = (item) => {
            // Store the user's selected tag in Firebase
            database.ref('tags').push({
              label: item.label,
              id: item.id,
            });
        
            // Update the state
            setTags(item.id);
          };
        
          return (
            <Section title={'Tags'}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {constants.tags.map((item, index) => {
                  return (
                    <TextButton
                      key={`Tags-${index}`}
                      label={item.label}
                      labelStyle={{
                        color: item.id == tags ? COLORS.white : COLORS.gray,
                        ...FONTS.body3,
                      }}
                      buttonContainerStyle={{
                        height: 50,
                        margin: 5,
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                        borderRadius: SIZES.base,
                        backgroundColor:
                          item.id == tags ? COLORS.primary : COLORS.lightGray2,
                      }}
                      onPress={() => handleTagPress(item)}
                    />
                  );
                })}
              </View>
            </Section>
          );
    
        
      };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
          <View style={styles.container}>
            {/* Transparent Background */}
            <TouchableNativeFeedback onPress={() => setShowFilter(false)}>
              <View style={styles.shadowTransparentBackground} />
            </TouchableNativeFeedback>
            <Animated.View style={[styles.containerFilter, { top: modalY }]}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.textFilter}>Filter Your Search</Text>
           <IconButton
              containerStyle={styles.iconButtonContainer}
              icon={icons.cross}
              iconStyle={{ tintColor: COLORS.gray2 }}
              onPress={() => setShowFilter(false)}
            />
              </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}>
            {/* Distance */}
            {renderDistance()}

            {/* Delivery Time */}
            {renderDeliveryTime()}

            {/* Pricing Range */}
            {renderPricingRange()}

            {/* Ratings */}
            {renderRatings()}

            {/* Tags */}
            {renderTags()}
          </ScrollView>
    
              {/* Apply Button */}
              <View style={styles.applyButton}>
            <TextButton
              label="Apply Filters"
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => console.log('Apply Filters')}
            />
              </View>
            </Animated.View>
          </View>
        </Modal>
      );
    };


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.transparentBlack7,
    },
    shadowTransparentBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    containerFilter: {
      position: 'absolute',
      left: 0,
      width: '100%',
      height: '100%',
      padding: SIZES.padding,
      borderTopRightRadius: SIZES.padding,
      borderTopLeftRadius: SIZES.padding,
      backgroundColor: COLORS.white,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: 'red'
    },
    textFilter: {
      flex: 1,
      ...FONTS.h3,
      fontSize: 18,
      color: 'black',
    },
    iconButtonContainer: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: COLORS.gray2,
    },
    applyButton: {
      position: 'absolute',
      ...Platform.select({
        android: { bottom: 100, height: 100 },
        ios: { bottom: 150, height: 110 },
      }),
      left: 0,
      right: 0,
      paddingHorizontal: SIZES.padding,
      paddingVertical: SIZES.radius,
      backgroundColor: COLORS.white,
    },
  });
  
  export default FilterModal;