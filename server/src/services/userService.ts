import { log } from "console";
import { userPrefferences, users } from "./db";



 
 
 
 export class UserService {
    constructor() {}
    static userPrefferences(userId: string) {
      return userPrefferences.find((e) => e.userId === userId);
    }
  
    static async getSingleUser(userId:string){
  
         return users.find((user) => user._id == userId);
   

    }
    static async getUserData(userId:string){
      
      const user= await this.getSingleUser(userId) as any
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

  