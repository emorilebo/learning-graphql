import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDef.js";
import resolvers from "./resolvers.js";
import jwt from 'jsonwebtoken'



const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context:({req})=>{
    console.log(req.headers)
    const {authorization} =  req.headers
    if(authorization){
      try{
        const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)
        return {userId}
      }catch(error){
        console.error('Token verification error:', error);
      throw new Error('Invalid or expired token');
 
      }
      
   }
  }
  
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// server.listen().then(({url})=>{
//   console.log(`Server is readt at ${url}`);
// })