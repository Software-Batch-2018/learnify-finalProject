import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '../components/ThemeContext';
import Background from '../components/background';
import Layout from '../components/layout';
import dynamic from 'next/dynamic';
import { domAnimation } from 'framer-motion';
import 'react-quill/dist/quill.snow.css';
const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
);

const LazyMotion = dynamic(
  () => import('framer-motion').then((c) => c.LazyMotion),
  {
    ssr: false,
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Admin Panel - Learnify</title>
      </Head>
      <main className="app">
        <ThemeProvider>
          <Background>
            <QueryClientProvider client={queryClient}>
              <LazyMotion features={domAnimation}>
                <Layout>
                  <Toaster
                    position="bottom-center"
                    toastOptions={{
                      className:
                        'text-sm font-medium !shadow-[0_2px_12px_2px_rgba(0,0,0,0.12)] !p-3',
                    }}
                  />
                  <Component {...pageProps} />
                </Layout>
              </LazyMotion>
            </QueryClientProvider>
          </Background>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
