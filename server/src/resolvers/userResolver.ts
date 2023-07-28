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

function ModifyMessage(sender: string) {
  return function (target: any, propertyKey: string) {
    // use  sender, target and propertyKey arguments ...
  };
}

export const userResolvers = {
  Query: {
   
  
    findUser: async (parrent: UserType, args: QueryUserArgs) => {
      console.log("find user");
      
      return  await UserService.getSingleUser(args.id);
    },
   findByNameSurname: async (parrent: UserType, args: { name: string }) => {
      return await UserService.findPersonsByNameAndSurname(args.name);
    },
   getUserPrefferences: async(parrent: UserType, args: QueryUserArgs) => {
    console.log("prefferences");
    
      return await UserService.userPrefferences(args.id);
    },
   async getUserData(parrent: UserPrefferencesType, args: QueryUserArgs) {
      return  await UserService.getUserData(args.id);
    },
   async getUserFriends(parrent: any, args: QueryUserArgs) {
      return  await UserService.getUserFriends(args.id);
    },
  },

  Mutation: {

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
type RefreshType{
  acessToken:String,
  refreshToken:String
}
type Query{
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

type Mutation{
  subscribeTo(input:FriendsHandlerType):PrefferencesType
  deleteFollower(input:FriendsHandlerType):PrefferencesType
  deleteFollowing(input:FriendsHandlerType):PrefferencesType
  changeNameSurname(input:changeNameSurnameType):User
}
`;
