import { UserAndPrefferncesType, UserType } from "@/../types/userType"

export class LStorage{
    static setUser(data:UserAndPrefferncesType){
      localStorage.setItem("logedPerson" ,JSON.stringify(data))
    }
  
    static getUser():UserAndPrefferncesType|undefined{
  
       const srtUser=localStorage.getItem("logedPerson")
       if(srtUser){
             return  JSON.parse(srtUser)
  
       }
    }
  }