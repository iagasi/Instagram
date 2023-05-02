import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userResolvers, userTypeDefs } from "./resolvers/userResolver";
import{ mergeResolvers,mergeTypeDefs }  from '@graphql-tools/merge'

const resolvers=mergeResolvers({...userResolvers}) 
const typeDefs= mergeTypeDefs([userTypeDefs])
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
 