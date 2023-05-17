import React, { FunctionComponent, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AuthLayout from './AuthLayout';

import { StackScreenProps } from '@react-navigation/stack';
import { MainParamType } from '../../navigation';
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from '../../components';
import { utils } from '../../utils';
import { firebase } from '../../Firebase/FirebaseConfig'


const SignUp = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setCShowPassword] = useState(false);
  const [saveMe, setSaveMe] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setcPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const isEnableSignUp = () => {
    return (
      email !== '' &&
      password !== '' &&
      cpassword !== '' &&
      username !== '' &&
      emailError === '' &&
      passwordError === '' &&
      cpasswordError === '' &&
      usernameError === ''
    );
  };
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [phonefocus, setPhonefocus] = useState(false);
  const [namefocus, setNamefocus] = useState(false);

  const [showpassword, setShowpassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [cpasswordfocus, setcPasswordfocus] = useState(false);

  //taking form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUserName] = useState('');
  const [address, setAddress] = useState('');
  // console.log(email);

  const [customError, setCustomError] = useState('');
  const [successmsg, setSuccessmsg] = useState(null);


  // const [useruid, setUseruid] = useState('');
  const handleSignup = () => {


      if (password != cpassword) {
          // alert("Password doesn't match");
          setCustomError("Password doesn't match");
          return;
      }
      else if (phone.length != 8) {
          setCustomError("Phone number should be 8 digit");
          return;
      }
      try {
          firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((userCredentials) => {
                  console.log(userCredentials?.user.uid);
                  console.log('user created')
                  // setSuccessmsg('User created successfully')
                  if (userCredentials?.user.uid != null) {
                      const userRef = firebase.firestore().collection('UserData')
                      userRef.add(
                          {
                              email: email,
                              password: password,
                              // cpassword: cpassword,
                              phone: phone,
                              username: username,
                              address: address,
                              uid: userCredentials?.user?.uid,
                          }
                      ).then(() => {
                          console.log('data added to firestore')
                          setSuccessmsg('User created successfully')
                      }).catch((error) => {
                          console.log('firestore error ', error)
                      }

                      )
                  }


              })
              .catch((error) => {
                  console.log('sign up firebase error ', error.message)
                  if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
                      setCustomError('Email already exists')
                  }
                  else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                      setCustomError('Invalid Email')
                  }
                  else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                      setCustomError('Password should be at least 6 characters')
                  }
                  else {
                      setCustomError(error.message)
                  }
              })
      }
      catch (error) {
          console.log('sign up system error ', error.message)
      }


  }
  return (
    <AuthLayout
      title="Getting Started"
      subtitle="Create an account to continue!"
      titleContainerStyle={{
        marginTop: SIZES.radius,
      }}>
      {/* Form Input And Sign Up */}
      <View style={styles.container}>
      <Text style={styles.successmessage}>{successmsg}</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
      <ScrollView> 
        {/* Form Inputs */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoComplete="email"
          onChange={value => {
            //validate email
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View style={styles.appendComponentEmail}>
              <Image
                source={
                  email == '' || (email != '' && emailError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={[
                  styles.imageCorrect,
                  {
                    tintColor:
                      email == ''
                        ? COLORS.gray
                        : email != '' && emailError == ''
                        ? COLORS.green
                        : COLORS.red,
                  },
                ]}
              />
            </View>
          }
          onChangeText={(text) => setEmail(text)}
        />
        <FormInput
          label="User Name"
          keyboardType="default"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          autoComplete="username"
          onChange={value => {
            //validate email
            // utils.validateEmail(value, setEmailError);
            setUserName(value);
          }}
          errorMsg={usernameError}
          appendComponent={
            <View style={styles.appendComponentEmail}>
              <Image
                source={
                  username == '' || (username != '' && usernameError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={[
                  styles.imageCorrect,
                  {
                    tintColor:
                      username == ''
                        ? COLORS.gray
                        : username != '' && usernameError == ''
                        ? COLORS.green
                        : COLORS.red,
                  },
                ]}
              />
            </View>
          }
          onChangeText={(text) => setName(text)}
        />

        <FormInput
          label="Password"
          autoComplete="password"
          onChange={value => {
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          secureTextEntry={!showPassword}
          errorMsg={passwordError}
          appendComponent={
            <TouchableOpacity
              style={styles.appendComponentPassword}
              onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? icons.eye_close : icons.eye}
                style={{ height: 20, width: 20, tintColor: COLORS.gray }}
              />
            </TouchableOpacity>
          }
          onChangeText={(text) => setPassword(text)}
        />
            <FormInput
          label="Confirm Password"
          autoComplete="password"
          onChange={value => {
            utils.validatecPassword(value, setcPasswordError);
            setCPassword(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          secureTextEntry={!showcPassword}
          errorMsg={cpasswordError}
          appendComponent={
            <TouchableOpacity
              style={styles.appendComponentPassword}
              onPress={() => setCShowPassword(!showcPassword)}>
              <Image
                source={showcPassword ? icons.eye_close : icons.eye}
                style={{ height: 20, width: 20, tintColor: COLORS.gray }}
              />
            </TouchableOpacity>
          }
          onChangeText={(text) => setCPassword(text)}
        />
          <FormInput
          label="Phone"
          keyboardType="phone-pad"
          onChange={value => {
            utils.validatePhone(value, setPhoneError);
            setPhone(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChangeText={(text) => setPhone(text)}
        />
          <FormInput
          label="Address"
          autoCompleteType="street-address"
          onChange={value => {
            utils.validateAddress(value, setAddressError);
            setAddress(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChangeText={(text) => setAddress(text)}
        />
        {/* Save me & Forgot Password */}
        <View style={styles.row}>
          <CustomSwitch value={saveMe} onChange={value => setSaveMe(value)} />
          <TextButton
            label="Forgot Password?"
            buttonContainerStyle={{ backgroundColor: null }}
            labelStyle={{ color: COLORS.gray, ...FONTS.body4 }}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
        {/* Sign Up */}
        <TextButton
          label="Sign Up"
          disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp()
              ? COLORS.primary
              : COLORS.primary,
          }}
          onPress={() => handleSignup()}
        />
        {/* Sign Up */}

        {/* <TextButton
          label=" Sign Up"
          buttonContainerStyle={{
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.primary,
            ...FONTS.h3,
          }}
          onPress={() => navigation.navigate('OTP')}
        /> */}

        {/* Footer */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            Already have an account?
          </Text>
          <TextButton
            label=" Sign In"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
        {/* Facebook */}
        <TextIconButton
          containerStyle={styles.facebook}
          icon={icons.fb}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: COLORS.white,
          }}
          label="Continue With Facebook"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: COLORS.white,
          }}
          onPress={() => console.log('FB')}
        />
        {/* Google */}
        <TextIconButton
          containerStyle={{
            ...styles.facebook,
            backgroundColor: COLORS.lightGray2,
            marginTop: SIZES.base * 2,
          }}
          icon={icons.google}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: null,
          }}
          label="Continue With Google"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: COLORS.black,
          }}
          onPress={() => console.log('Google')}
        />
           </ScrollView> 
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding,
  },
  container1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
},
  appendComponentEmail: {
    justifyContent: 'center',
    // borderWidth: 1
  },
  imageCorrect: {
    height: 20,
    width: 20,
    // tintColor: COLORS.green,
  },
  appendComponentPassword: {
    // width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    justifyContent: 'space-between',
  },
  rowSignUp: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    justifyContent: 'center',
  },
  facebook: {
    height: 60,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    // marginTop: SIZES.base,
    marginTop: SIZES.base * 2,
  },
  errormsg: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
},
successmessage: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
}
});

export default SignUp;