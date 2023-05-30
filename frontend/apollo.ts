import { ApolloClient, InMemoryCache } from "@apollo/client";

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
const wsLink =  typeof window !== "undefined"
? new GraphQLWsLink(
        createClient({
            url: "ws://localhost:4000/graphql",
        })
  )
: null;

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL+"/graphql"
  });

  const link =
    typeof window !== "undefined" && wsLink != null
        ? split(
                ({ query }) => {
                    const def = getMainDefinition(query);
                    return (
                        def.kind === "OperationDefinition" &&
                        def.operation === "subscription"
                    );
                },
                wsLink,
                httpLink
          )
        : httpLink;


export const CACHE=new InMemoryCache()

const client = new ApolloClient({
    link:link,
    cache:CACHE ,
});

export default client;