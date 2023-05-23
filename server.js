import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { randomUUID } from "crypto";

const typeDefs = `#graphql
 
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
  }

  type Query {
    users: [User]
    user(id:ID!):User
  }

  input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
  }

  type Mutation{
    
  }


`;

const users = [
  {
    id: "ssid",
    firstName: "Godfrey",
    lastName: "Lebo",
    email: "godfreylebo@gmail.com",
    password: "12345",
  },
  {
    id: "ssad",
    firstName: "Francis",
    lastName: "Ekpan",
    email: "francisekpan@gmail.com",
    password: "12345",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {},

  Mutation: {},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    userLoggedIn: false,
  },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
