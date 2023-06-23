import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../features/searchProduct/SearchSlice';

const Header = ({headerPageText}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const handleSearch = () =>{
    dispatch(searchProduct(''))
    navigation.navigate('SearchPage')
  }
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
      {headerPageText === 'Category Page' && (
        <View style={styles.searchIcon}>
          <AntDesign
            name="search1"
            color="white"
            size={25}
            onPress={handleSearch}

          />
        </View>
      )}
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
  searchIcon: {
    position: 'absolute',
    right: 5,
  },
});
