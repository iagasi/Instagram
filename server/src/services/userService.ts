import { UserPrefferencesType, UserType } from "../../../types/userType";

const user: UserType[] = [
    {
        _id: "1",
        name: "Georg",
        surname: "Herimand",
        image: "",
      },
      {
        _id: "2",
        name: "Alex",
        surname: "Jerix",
        image: "",
      },
      {
        _id: "3",
        name: "Ande",
        surname: "Avallon",
        image: "",
      }


]
  
  const userPrefferences: UserPrefferencesType[] = [
    {
      _id: "456",
      userId: "1",
      followers: ["1","145","444"],
      followings:["4"],
      posts: ["1","5","8","77"],
      saved: ["4","55"],
      tagged: ["44","547","456","575745"],
    },

    {
        _id: "54",
        userId: "2",
        followers: ["1","145","444"],
        followings:["4", "5"],
        posts: ["51","65",],
        saved: ["4","55"],
        tagged: ["54","45","89","45"],
      },
      {
        _id: "45",
        userId: "1",
        followers: ["2","145","444"],
        followings:["4"],
        posts: ["1","5","8","77"],
        saved: ["66","55"],
        tagged: ["55","5453","666","55"],
      },
  ];
  const users = user;
  
 
 
 
 export class UserService {
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

    static findPersonsByNameAndSurname( searchCase:string){
        return users.filter(user=>user.name.toLowerCase().includes(searchCase.toLowerCase())||
        
        user.surname.toLowerCase().includes(searchCase.toLowerCase())
        )
    }
  }

  