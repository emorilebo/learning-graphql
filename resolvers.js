import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
// import {ApolloError, AuthenticationError} from 'apollo-server'
import { ApolloServer } from "@apollo/server"

const prisma = new PrismaClient()

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {},
  
    Mutation: {
      signupUser:async(_,{userNew})=>{
       const user = await prisma.user.findUnique({where:{email:userNew.email}})
       if(user) throw new Error(`User ${user.email} already exists`)
       const hashedPassword = await bcrypt.hash(userNew.password, 10)
       const newUser =  await prisma.user.create({
          data:{
            ...userNew,
            password: hashedPassword
          }
        })
        return newUser
      },

      signinUser:async(_,{userSignin})=>{
        const user = await prisma.user.findUnique({where:{email:userSignin.email}})
        if(!user) throw new Error(`User ${userSignin.email} doesnt exist`)
        const doMatch = await bcrypt.compare(userSignin.password, user.password)
        f(!user) throw new Error(`User ${userSignin.email} pr password is invalid`)
      },
    },
  };

  export default resolvers;