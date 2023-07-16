import { ApolloClient, InMemoryCache,from } from "@apollo/client";

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { LStorage } from "./helpers/user";
import { onError } from "@apollo/client/link/error";
import axios from "axios";
import { LocalStorageUserType } from "../types/userType";
///////////////////////////////////
const SERVER_URL=process.env.NEXT_PUBLIC_SERVER_URL

 async function getNewToken(){
const res=await axios.post(SERVER_URL+"/refresTokens",{},{withCredentials:true})
const tokenAndId=res.data as LocalStorageUserType
console.log(tokenAndId);

LStorage.setUser(tokenAndId)

return tokenAndId.acessToken

}
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.log(err.extensions.code);

      switch (err.extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        
        case "UNAUTHENTICATED":
          // Modify the operation context with a new token
          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: getNewToken(),
            },
          });

          console.log(7888);
          
          // Retry the request, returning the new observable
         return forward(operation);
      }
    }
  }

});

////////////////////////////////////
const authLink = setContext((_, { headers }) => {
  const token = LStorage.getUser()?.acessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer${token}` : "",
    }
  }
});
const wsLink =  typeof window !== "undefined"
? new GraphQLWsLink(
        createClient({
            url: process.env.NEXT_PUBLIC_WS_URL||"",
        })
  )
: null;

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL+"/graphql",
    credentials: 'include',
    
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
                httpLink,        

          )
        : httpLink;

export const CACHE=new InMemoryCache()

const client = new ApolloClient({
    link: from([errorLink,authLink.concat(link)]),
    cache:CACHE ,
});

export default client;