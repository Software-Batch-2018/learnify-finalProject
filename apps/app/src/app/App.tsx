import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import BottomNavigation from '../navigations/bottom.navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://0263b188618c31aa5f1393e12d62b398@o4505835112300544.ingest.sentry.io/4505835114070016',
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
    },
  },
});
function App() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <BottomNavigation />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
export default Sentry.Native.wrap(App);
