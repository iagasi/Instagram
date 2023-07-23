import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_KEY = "secretFromEnvFile";
const REFRESH_TOKEN_KEY = "secretFromEnvFile";
import express from "express";
import { UserService } from "./userService";
import { TokenDb } from "../db/schemas/TokenDb";
import { log } from "console";
import { isArray } from "util";
import { cookieName } from "../../../constants";

export function generateTokens(payload: object) {
  var acessToken = jwt.sign(payload, ACCESS_TOKEN_KEY, {
    expiresIn: "5m",
  });
  var refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, {
    expiresIn: "10d",
  });

  return {
    acessToken,
    refreshToken,
  };
}

export function validateAcessToken(req: express.Request) {
  let token = req.headers.authorization?.split("Bearer")[1];

  // console.log(req.headers.instacookie);

  let verify = null;
  if (token) {
    try {
      verify = jwt.verify(token, ACCESS_TOKEN_KEY);
    } catch (e) {
      console.log("acess Expired");
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
export async function refreshAcessToken(req: express.Request) {
  let token = req.headers.instacookie;
  let plainToken = null;
  if (typeof token === "string") {
    plainToken = token
  } else if (isArray(token)) {
    plainToken = token[0];
  }
 
  if (token && plainToken) {
    try {
      const decoded = jwt.decode(plainToken) as { _id: string } | null;

      if (!decoded) {
        console.log("decoding error");
        return;
        throw new Error("token decoding Error");
      }
      const refreshFoundToken = await TokenDb.findOne({ userId: decoded._id });

      if (!refreshFoundToken) {
        console.log("Token in db not Exists");
        return;
        throw new Error("Token in db not Exists");
      } else {
        if (refreshFoundToken) {
          try {
            if (refreshFoundToken.refreshToken !== plainToken) {
              console.log("refreshFoundToken.refreshToken!==plainToken");
              return;
            }
          } catch (e) {
            console.log("refresh token INVALID");
            return;
          }
        }
      }
      const user = await UserService.getSingleUser(decoded._id);
      if (!user) {
        console.log("!user");
        console.log("no user");
        
        return;
        throw new Error("refreshToken user IsnFound");
      }
      const tokens = generateTokens({ _id: user?._id, name: user?.name });
      return { ...tokens, user };
    } catch (e) {
      throw new GraphQLError("Ist authenticated" + e, {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 405 },
        },
      });
    }
  }
}
