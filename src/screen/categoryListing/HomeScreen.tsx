import React, { useEffect } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import Carousel from './Carousel'
import Header from '../../utils/Header'
import { requestUserPermission } from '../../utils/NotificationService';
import messaging from '@react-native-firebase/messaging';
import CategoryListing from './CategoryListing';
import AllProduct from './AllProduct';
import { getCategory } from '../../features/categoryListing/CategoryListingSlice';
import { getAllProduct } from '../../features/productListing/ProductListingSlice';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
const HomeScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getAllProduct());
    }, []);
    const retrieveFCMToken = async () => {
        if (await requestUserPermission()) {
            messaging()
                .getToken()
                .then((fcmToken) => {
                    console.log('FCM Token -> ', fcmToken);
                });
        } else {
            console.log('Not Authorization status');
        }
    };
    useEffect(() => {
        retrieveFCMToken()
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Header headerPageText="Home Page" navigation={navigation} />
            <View style={styles.upperContainer}>
                <Carousel />
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.Categories}>
                    Categories
                </Text>
                <View style={styles.middleCardContainer}>
                    <CategoryListing navigation={navigation} />
                </View>
            </View>
            <View style={styles.lowerContainer}>
                <Text style={styles.Categories}>
                    Top Product
                </Text>
                <AllProduct navigation={navigation} />
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#dfe4ea',
    },
    upperContainer: {
        width: '100%',
        height: 'auto',
    },
    middleContainer: {
        padding: 5,
        height: 175,
        width: '100%',
    },
    Categories: {
        fontSize: 18,
        fontWeight: "500",
    },
    middleCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: "100%",
        height: "80%",
    },
    lowerContainer: {
        width: "100%",
        height: "100%",
        padding: 5,
    }
})