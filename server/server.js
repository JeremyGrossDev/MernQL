const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require("merge-graphql-schemas");
const mongoose = require("mongoose");
require("dotenv").config();

// express server
const app = express();

// db
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error", error);
  }
};
// execute database connection
db();

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./typeDefs")));

// resolvers
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

// graphQL server
const appolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// middleware ApolloServer to HTTP
appolloServer.applyMiddleware({ app });

// server
const httpServer = http.createServer(app);

// rest endpoint
app.get("/rest", function (req, res) {
  res.json({
    data: "Rest endpoint says hi!",
  });
});

// port
app.listen(process.env.PORT, function () {
  console.log(`Node server address:     http://10.1.2.40:${process.env.PORT}`);
  console.log(
    `GrahpQL server address:  http://10.1.2.40:${process.env.PORT}${appolloServer.graphqlPath}`
  );
});
