const { ApolloServer } = require("apollo-server");
require("dotenv").config();

const typeDefs = `
  type Query {
    totalPosts: Int!
  }
`;

const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};

const appolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

appolloServer.listen(process.env.PORT, function () {
  console.log(`Node server port:  ${process.env.PORT}`);
  console.log(
    `GrahpQL server address:  ${process.env.PORT}${appolloServer.graphqlPath}`
  );
});
