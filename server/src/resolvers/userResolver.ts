import { UserType, UserPrefferencesType } from "../../../types/userType";
const user: UserType = {
  _id: "1",
  name: "Georg",
  surname: "Efsdffs",
  image: "",
};

const userPrefferences: UserPrefferencesType[] = [
  {
    _id: "456",
    userId: "1",
    followers: ["1","145","444"],
    followings:["4"],
    posts: ["1"],
    saved: ["4","55"],
    tagged: ["44","547","456","575745"],
  },
];
const users = [user];

interface QueryUserArgs {
  id: string;
}

class UserService {
  constructor() {}
  static userPrefferences(userId: string) {
    return userPrefferences.find((e) => e.userId === userId);
  }

  static getSingleUser(userId:string){
    return users.find((user) => user._id == userId);

  }
  static getUserData(userId:string){
    const user=this.getSingleUser(userId)
    if(user){
          const prefferences=this.userPrefferences(user?._id)
          return {user:user,prefferences:prefferences}

    }
  

  }
}
export const userResolvers = {
  Query: {
    findUser: (parrent: UserType, args: QueryUserArgs) => {
      return UserService.getSingleUser(args.id)
    },
    getUserPrefferences: (parrent: UserType, args: QueryUserArgs) => {
      return UserService.userPrefferences(args.id);
    },
    getUserData(parrent: UserPrefferencesType, args: QueryUserArgs){
      console.log(UserService.getUserData(args.id));
      
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
}
`;
