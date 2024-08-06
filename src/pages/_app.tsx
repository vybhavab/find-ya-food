import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import "../components/cards/styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => <ChakraProvider>
  <Component {...pageProps} />
</ChakraProvider>

export default MyApp;
