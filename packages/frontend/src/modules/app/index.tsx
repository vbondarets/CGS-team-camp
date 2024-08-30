/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { MainRouter } from '../navigation';

import * as theme from '../theme';
import * as Styled from './app.styled';
import '../../style.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Number.POSITIVE_INFINITY
    }
  },
  queryCache: new QueryCache({
    onError: async (error: any, query) => {
      if (query.state.data !== undefined) {
        console.error(`Something went wrong: ${error.message}`);
      }
      if (error.response) {
        console.log(error.response.status, '🟡 query');
      }
    }
  })
});

const AppContainer = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Styled.GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <MainRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default AppContainer;
