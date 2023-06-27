import React from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';

const UserNotLogin = ({navigation}:any) => {
  return (
    <View style={styles.conatiner}>
      <Image
        source={require('../../assets/image/no-cart.gif')}
        style={styles.cartImage}
      />
      <Text style={styles.cartText}>Missing Cart items?</Text>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('LoginPage',{type:"cartPage"})}>
          <Text style={styles.loginButton}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserNotLogin;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cartImage: {
    width: '100%',
    height: 300,
  },
  cartText: {
    fontSize: 25,
    color: 'black',
  },
  button: {
    backgroundColor: '#ff6600',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  loginButton: {
    color: '#fff',
    fontSize: 18,
  },
});
