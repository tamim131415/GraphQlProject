// client.js (React Example)

import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.users.map(user => (
        <p key={user.id}>{user.name} ({user.email})</p>
      ))}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Users />
    </ApolloProvider>
  );
}

export default App;
