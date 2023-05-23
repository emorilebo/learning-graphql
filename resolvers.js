import { PrismaClient } from '@prisma/client'
import {ApolloError, AuthenticationError} from 'apollo-server'

const prisma = new PrismaClient()

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {},
  
    Mutation: {
      signupUser:async(_,{userNew})=>{
       const user = await prisma.user.findUnique({where:{email:userNew.email}})
       if(user) throw new ApolloError(`User ${user.email} already exists`)
        prisma.user.create({
          data:{
            firstName:"Emori"
          }
        })
      }
    },
  };

  export default resolvers;