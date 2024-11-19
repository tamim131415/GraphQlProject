// server.js

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Create and configure the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
