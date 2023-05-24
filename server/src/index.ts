import { ApolloServer } from "apollo-server-express";
import { userResolvers, userTypeDefs } from "./resolvers/userResolver";
import{ mergeResolvers,mergeTypeDefs }  from '@graphql-tools/merge'
import { postResolvers, postTypeDefs } from "./resolvers/postResolver";
import express from "express"
import cors from "cors"
import { fileRouter } from "./resolvers/fileResolver";
const resolvers=mergeResolvers([userResolvers,postResolvers]) 
const typeDefs= mergeTypeDefs([userTypeDefs,postTypeDefs])


async function start(){
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start()
  const app = express();
  app.use(cors())
  app.use(express.static('public'))
  app.use("/file",fileRouter)
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
  
  }
  

start();
