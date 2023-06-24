import express, { CookieOptions } from "express";
import { cookieName } from "../../../constants";
import {
  UserType,
  UserPrefferencesType,
  UserAndPrefferncesType,
} from "../../../types/userType";
import { UserService } from "../services/userService";
import { refreshAcessToken } from "../services/tokenservice";

interface QueryUserArgs {
  id: string;
}
type FriendsHandlerType = {
  input: {
    myId: string;
    candidateId: string;
  };
};

type changeNameSurnameType = {
  input: {
    myId: string;
    name: string;
    surname: string;
  };
};
export const userResolvers = {
  Query: {
    login: async (
      parrent: UserType,
      args: Pick<UserType, "email" | "password">,
      { req, res }: { req: express.Request; res: express.Response }
    ) => {
      const resUser = await UserService.login({
        email: args.email,
        password: args.password,
      });
      const cookieOptions: CookieOptions = {
        //httpOnly: true,
        maxAge: 1 * 60 * 60 * 24 * 1000,
        secure: true,
      };
      res.cookie(cookieName, resUser?.refreshToken, cookieOptions);

      return {
        acessToken: resUser?.acessToken,
        _id: resUser?._id,
      };
    },
    refreshToken: (
      _: any,
      args: { refreshToken: string },
      { req, res }: { req: express.Request; res: express.Response }
    ) => {
      refreshAcessToken(args.refreshToken);
    },
    findUser: (parrent: UserType, args: QueryUserArgs) => {
      return UserService.getSingleUser(args.id);
    },
    findByNameSurname: (parrent: UserType, args: { name: string }) => {
      return UserService.findPersonsByNameAndSurname(args.name);
    },
    getUserPrefferences: (parrent: UserType, args: QueryUserArgs) => {
      return UserService.userPrefferences(args.id);
    },
    getUserData(parrent: UserPrefferencesType, args: QueryUserArgs) {
      return UserService.getUserData(args.id);
    },
    getUserFriends(parrent: any, args: QueryUserArgs) {
      return UserService.getUserFriends(args.id);
    },
  },

  Mutation: {
    register: async (parrent: UserType, args: { input: UserType }) => {
      //   throw new Error("ooooooooooooooppppp")
      const res = await UserService.register(args.input);
      return res;
    },

    async subscribeTo(
      parrent: any,
      args: FriendsHandlerType
    ): Promise<UserAndPrefferncesType | null> {
      return await UserService.subscribe(
        args.input.myId,
        args.input.candidateId
      );
    },
    async deleteFollower(
      parrent: any,
      args: FriendsHandlerType
    ): Promise<UserAndPrefferncesType | null> {
      //return null;
      return await UserService.deleteFollower(
        args.input.myId,
        args.input.candidateId
      );
    },
    async deleteFollowing(
      parrent: any,
      args: FriendsHandlerType
    ): Promise<UserAndPrefferncesType | null> {
      return await UserService.deleteFollowing(
        args.input.myId,
        args.input.candidateId
      );
    },

    async changeNameSurname(paretn: any, args: changeNameSurnameType) {
      return await UserService.changeNameSurname(
        args.input.myId,
        args.input.name,
        args.input.surname
      );
    },
  },
};

export const userTypeDefs = `
type User{
 _id:String
  name: String
  surname: String
  image:String
  email:String
  password:String
}

type UserPrefferencesType {
  _id: String
  userId:String
  followers:[String]
  followings:[String]
  posts: [String]
  saved: [String]
  tagged: [String]
}

type PrefferencesType{
  user:User!
  prefferences:UserPrefferencesType
}
type UserFriendsType{
  followers:[User]
  followings:[User]
}
type LoginType{
  _id:String
  acessToken:String
  
}
type Query{
  refreshToken(refreshToken:String):String
  login(password:String,email:String,name:String):LoginType
  findUser(id:String):User
  getUserFriends(id:String):UserFriendsType
  getUserPrefferences(id:String):[UserPrefferencesType]
  getUserData(id:String):PrefferencesType
  findByNameSurname(name:String):[User]
}


input FriendsHandlerType{
myId:String
candidateId:String

}

input changeNameSurnameType {
    myId: String
    name: String
    surname: String
}
input inputRegister {
  _id:String
  name: String
  surname: String
  image:String
  email:String
  password:String
}
type Mutation{
  subscribeTo(input:FriendsHandlerType):PrefferencesType
  deleteFollower(input:FriendsHandlerType):PrefferencesType
  deleteFollowing(input:FriendsHandlerType):PrefferencesType
  changeNameSurname(input:changeNameSurnameType):User
  register(input:inputRegister):String
}
`;
