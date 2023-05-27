import React from 'react';
import { NativeBaseProvider } from 'native-base';
import BottomNavigation from '../navigations/bottom.navigation';

export default function App() {
  return (
    <NativeBaseProvider>
      <BottomNavigation />
    </NativeBaseProvider>
  );
}
