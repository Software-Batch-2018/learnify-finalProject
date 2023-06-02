import AsyncStorage from '@react-native-async-storage/async-storage';

export const hasToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const returnToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value;
  } catch (e) {
    return null;
  }
};






