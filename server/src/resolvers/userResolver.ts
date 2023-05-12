import { log } from "console";
import { UserType, UserPrefferencesType } from "../../../types/userType";
import { UserService } from "../services/userService";

interface QueryUserArgs {
  id: string;
}


export const userResolvers = {
  Query: {
    findUser: (parrent: UserType, args: QueryUserArgs) => {

      
      
      return UserService.getSingleUser(args.id)
    },
    findByNameSurname: (parrent: UserType, args: {name:string}) => {
      return UserService. findPersonsByNameAndSurname(args.name)
    },
    getUserPrefferences: (parrent: UserType, args: QueryUserArgs) => {
      return UserService.userPrefferences(args.id);
    },
    getUserData(parrent: UserPrefferencesType, args: QueryUserArgs){
      console.log(UserService.getUserData(args.id));
      console.log(Math.random()*10);
      
      
      return UserService.getUserData(args.id)
    }
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
type Query{
  findUser(id:String):User
  getUserPrefferences(id:String):[UserPrefferencesType]
  getUserData(id:String):PrefferencesType
  findByNameSurname(name:String):[User]
}
`;
