import { createServer } from "http";
import { connectType, connectedUserType } from "../types/messengerType";
import { UserType } from "../types/userType";
import express from "express";
import io from "socket.io";
import { FRONTEND_URL, WS_URL } from "./cosnstants";
 export function ws() {
    let connected: connectedUserType[] = [];
    const app = express();
    const httpServer = createServer(app);
  
    const io: io.Socket = require("socket.io")(httpServer, {
      cors: {
        origin: FRONTEND_URL,
      },
    });
  
    io.on("connection", (socket: io.Socket) => {
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
  
        socket.broadcast.emit("check-connection");
      });
      socket.on("connectedUsers", (idies: string[]) => {
        const users: any[] = [];
        idies.forEach((id) => {
          const found = connected.find(
            (user) => user._id.toString() === id.toString()
          );
          if (found) {
            users.push(found);
          }
        });
        socket.emit("connectedUsers", users);
      });
  
      socket.on("isOnline", (userId: string) => {
        const found = connected.find(
          (user) => user._id.toString() === userId.toString()
        );
        console.log(
          " //////////////////////////////////////////////////////////////////"
        );
       console.log(found);
       
          socket.emit("isOnline",!!found )
        
      });
      socket.on("getSocketId", (user: UserType & { from: string }) => {
        const candidate = connected.find((conUser) => conUser._id === user._id);
  
        io.to(user.from).emit("getSocketId", candidate?.socketId);
      });
  
      socket.on("call", (data: connectType) => {
        if (!data.to) {
          console.log(
            " call to socket id undefned//////////////////////////////////////////////////////////////////"
          );
        }
  
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
      socket.on("disconnect", () => {
        connected = connected.filter((c) => c.socketId !== socket.id);
        socket.broadcast.emit("check-connection");
      });
    });
    httpServer.listen(WS_URL, () => {
      console.log("ws serwer");
    });
  }

ws()