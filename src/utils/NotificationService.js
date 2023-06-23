import messaging from '@react-native-firebase/messaging';
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status (authStatus):', authStatus);
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

