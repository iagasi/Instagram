import { log } from "console";
import {
  UserType,
  UserPrefferencesType,
  UserAndPrefferncesType,
} from "../../../types/userType";
import { UserService } from "../services/userService";

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
