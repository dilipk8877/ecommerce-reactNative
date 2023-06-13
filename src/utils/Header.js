import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({headerPageText}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerIcon}>
        <AntDesign
          onPress={() => navigation.openDrawer()}
          name="menuunfold"
          size={30}
          color={'white'}
        />
      </View>
      <View>
        <Text style={styles.headerText}>{headerPageText}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#ff6600',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerIcon: {
    position: 'absolute',
    left: 5,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
});
