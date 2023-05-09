import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userResolvers, userTypeDefs } from "./resolvers/userResolver";
import{ mergeResolvers,mergeTypeDefs }  from '@graphql-tools/merge'
import { postResolvers, postTypeDefs } from "./resolvers/postResolver";

const resolvers=mergeResolvers([userResolvers,postResolvers]) 
const typeDefs= mergeTypeDefs([userTypeDefs,postTypeDefs])
const server = new ApolloServer({
 typeDefs,
resolvers,
});

async function start() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

start();
 