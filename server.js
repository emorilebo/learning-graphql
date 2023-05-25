import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDef.js";
import resolvers from "./resolvers.js";
import jwt from 'jsonwebtoken'


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context:({req})=>{
    console.log(req.headers)
   const {authorization} =  req.headers
   if(authorization){
    const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)
    console.log(userId)
    return {userId}
   }
  }
  
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
