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
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

import { connectType, connectedUserType } from "../../types/messengerType";
import { UserType } from "../../types/userType";
import { chatResolver, chatTypeDefs } from "./resolvers/chatResolver";

import { validateAcessToken } from "./services/tokenservice";

const resolvers = mergeResolvers([userResolvers, postResolvers, chatResolver]);
const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs, chatTypeDefs]);
async function start() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();

  // const corsOptions = {
  //   origin:[ "http://localhost:3000"],
  //   credentials: true,

  // };
  // app.use(cors(corsOptions));

  app.use(express.static("public"));
  app.use("/file", fileRouter);

  const httpServer = createServer(app);

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
      origin: ["http://localhost:3000", "http://localhost:4000"],
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        if (req.headers.referer !== "http://localhost:4000/graphql") {
          console.log(req.headers.cookie);

          validateAcessToken(req);
        }

        return { req, res };
      },
    })
  );

  httpServer.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
}

start();

import io from "socket.io";
import { log } from "console";
import { GraphQLError } from "graphql";

function v() {
  let connected: connectedUserType[] = [];
  const app = express();
  const httpServer = createServer(app);

  const io: io.Socket = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket: io.Socket) => {
    // console.log("New user is connect")
    socket.on("setUser", (user: UserType) => {
      const isExist = connected.find((conUser) => conUser._id === user._id);
      if (!isExist && user) {
        connected.push({
          ...user,
          socketId: socket.id,
        });
      }

      if (isExist) {
        isExist.socketId = socket.id;
      }
      socket.emit("setUserId", isExist?.socketId);
    });

    socket.on("getSocketId", (user: UserType & { from: string }) => {
      const candidate = connected.find((conUser) => conUser._id === user._id);
      console.log(candidate);

      io.to(user.from).emit("getSocketId", candidate?.socketId);
    });

    socket.on("call", (data: connectType) => {
      if (!data.to) {
        console.log(
          " call to socket id undefned//////////////////////////////////////////////////////////////////"
        );
      }
      console.log("///////////////////////////");

      io.to(data.to).emit("call", data);
    });

    socket.on("answer", (data: Omit<connectType, "user" | "from">) => {
      if (!data.to) {
        console.log(
          " answer to socket id undefned//////////////////////////////////////////////////////////////////"
        );
      }

      io.to(data.to).emit("answer", data);
    });
    socket.on("disconnect", (id) => {
      console.log(id);
    });

    socket.on("deleteUser", (socketId: string) => {
      console.log("..................");

      console.log(socketId);
      console.log("..................");

      connected = connected.filter((conUser) => conUser.socketId !== socketId);
    });
  });
  httpServer.listen(2000, () => {
    console.log("ws serwer");
  });
}
v();
