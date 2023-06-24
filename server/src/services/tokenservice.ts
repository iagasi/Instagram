import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = "sfsdsdfsd";
const REFRESH_TOKEN_KEY = "sfsdsdfsd";
import express from "express";

export function generateTokens(payload: object) {
  var acessToken = jwt.sign(payload, ACCESS_TOKEN_KEY);
  var refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY);

  return {
    acessToken,
    refreshToken,
  };
}

export function validateAcessToken(req: express.Request) {
  let token = req.headers.authorization?.split("Bearer")[1];
  const user = "5";
  token = "5";
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
export function refreshAcessToken(refreshToken:string){
    console.log("refreshAcessToken(refreshToken:string");
    
    const token =refreshToken
    let verify = null;
    if (token) {
      try {
        verify = jwt.verify(token, REFRESH_TOKEN_KEY);
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