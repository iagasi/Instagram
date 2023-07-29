import cookieParser from "cookie-parser";
require("amd-loader");

import { ApolloServer } from "@apollo/server";
import { userResolvers, userTypeDefs } from "./resolvers/userResolver";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { postResolvers, postTypeDefs } from "./resolvers/postResolver";
import express from "express";
import cors from "cors";
import { fileRouter } from "./resolvers/fileResolver";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

import { connectType, connectedUserType } from "../../types/messengerType";
import { UserType } from "../../types/userType";
import { chatResolver, chatTypeDefs } from "./resolvers/chatResolver";

import { validateAcessToken } from "./services/tokenservice";
export interface IsloggedRequest extends express.Request {
  isLogged: boolean;
}
import { refreshTokensApi } from "./resolvers/refreshTokenController";
import { authApi } from "./resolvers/authController";
import { connectDb } from "./db";
import { FRONTEND_URL, SERVER_HOST, SERVER_PORT, SERVER_URL, WS_URL } from "./serverConstants";
import { hostname } from "os";

const resolvers = mergeResolvers([userResolvers, postResolvers, chatResolver]);
const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs, chatTypeDefs]);
async function start() {
  if (!FRONTEND_URL || !SERVER_URL) {
    console.log("frontend or server url ERROR");

    return;
  }
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();
  connectDb();
  app.use(express.json());
  app.use(
    cors({
      origin: [FRONTEND_URL,SERVER_URL, "http://localhost:3000","http://app:3000"],
      credentials: true,
      allowedHeaders: [
        "Access-Control-Allow-Origin",
        "Content-Type",
        "Authorization",
        "instacookie",
      ],
      exposedHeaders: ["Set-Cookie"],
    })
  );

  app.use(cookieParser());

  app.use("/", authApi);

  app.use("/", refreshTokensApi);

  app.use(express.static("public"));
  app.use("/file", fileRouter);
  const http = require('http');

  const hostname = '127.0.0.1'; // Replace this with the desired hostname
  const port = 3000; // Replace this with the desired port number
  
  //const s = http.createServer(app);
  



  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [FRONTEND_URL, SERVER_URL, "http://localhost:3000"],
      credentials: true,
      allowedHeaders: ["Access-Control-Allow-Credentials", "instacookie", "Access-Control-Allow-Origin",
    ],
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {

        const isValid = validateAcessToken(req);

        return { req, res };
      },
    })
  );

  httpServer.listen(SERVER_PORT,SERVER_HOST, () => {
    console.log(`🚀 Server ready at $/graphql`,httpServer.address());
  });

  // httpServer.listen(SERVER_PORT, SERVER_HOST, () => {
  //   console.log(`Server running at http://${hostname}:${port}/`);
  // });
}

start();
