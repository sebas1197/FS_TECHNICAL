import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { Home } from './pages/Home';
import 'normalize.css';
import './index.css';

export const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);
