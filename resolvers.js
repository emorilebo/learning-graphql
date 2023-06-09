import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
// import {ApolloError, AuthenticationError, gql} from 'apollo-server'
import { ApolloServer } from "@apollo/server"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()


const resolvers = {
    Query: {
      users: async (_, args, context)=>{
        const {userId} = context
        console.log(context) 
        if(!userId) throw new Error("You must be logged in")
        const users = await prisma.user.findMany({
          orderBy: {
            createdAt:"desc"
          },
          where:{
            id:{
              not:userId
            }
          }
        })
        return users
      }
    },
  
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

      signinUser:async (parent,{userSignin},context)=>{
        const user = await prisma.user.findUnique({where:{email:userSignin.email}})
        if(!user) throw new Error(`User ${userSignin.email} does not exist`)
        const doMatch = await bcrypt.compare(userSignin.password, user.password)
        if(!doMatch) throw new Error(`User ${userSignin.email} or password is invalid`)
        const token  = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        console.log(token)
        return {token}
      },
    },
  };

  export default resolvers;