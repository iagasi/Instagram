import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = "sfsdsdfsd";
const REFRESH_TOKEN_KEY = "sfsdsdfsd";
import express from "express";
import { UserService } from "./userService";
import { TokenDb } from "../db/schemas/TokenDb";

export function generateTokens(payload: object) {
  var acessToken = jwt.sign(payload, ACCESS_TOKEN_KEY,{expiresIn:"1d"});
  var refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY,{expiresIn:"10d"});

  return {
    acessToken,
    refreshToken,
  };
}

export function validateAcessToken(req: express.Request) {
  
  let token = req.headers.authorization?.split("Bearer")[1];

  let verify = null;
  if (token) {
    try {
      verify = jwt.verify(token, ACCESS_TOKEN_KEY);
    } catch (e) {
      //   console.log(e);
    }
  }

  if (!token || !verify) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
  return { token };
}
export  async function refreshAcessToken(Token: string) {
  const token = Token;

  let verify = null;
  if (token) {
    try {
      const decoded = jwt.decode(token) as { _id: string } | null;
      if (!decoded) {
        throw new Error("token decoding Error");
      }
      const foundToken = await TokenDb.findById(decoded._id)
  
      if (!foundToken) {
        throw new Error("Token in db not Exists");
      }
const user= await UserService.getSingleUser(decoded._id)
if(!user){throw new Error("refreshToken user IsnFound")}
   const tokens=generateTokens({_id:user?._id,name:user?.name})
   return {...tokens,user}
    } catch (e) {
      throw new GraphQLError("Ist authenticated"+e, {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 405 },
        },
      });
    }
  }
}
