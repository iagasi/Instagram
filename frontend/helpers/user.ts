import { UserAndPrefferncesType, UserType } from "@/../types/userType"

export class LStorage{
    static setUser(loggedUser:UserType){
      localStorage.setItem("logedPerson" ,JSON.stringify(loggedUser))
    }
  
    static getUser():UserType|undefined{
  
       const srtUser=localStorage.getItem("logedPerson")
       if(srtUser){
             return  JSON.parse(srtUser)
  
       }
    }
  }