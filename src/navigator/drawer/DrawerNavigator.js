import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainStack from '../MainStack';
import Profile from '../../screen/profile/Profile';
import CustomDrawer from './CustomDrawer/CustomDrawer';

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: false, swipeEdgeWidth: 0}}>
      <Drawer.Screen
        name="Home"
        component={MainStack}
        options={{
          headerShown: false, 
          
        }}
      />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
