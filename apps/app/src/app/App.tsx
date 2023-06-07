import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import BottomNavigation from '../navigations/bottom.navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
    },
  },
});
export default function App() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <BottomNavigation />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
