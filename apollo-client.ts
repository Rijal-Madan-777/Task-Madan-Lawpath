import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`, 
  },
});

export default client;
