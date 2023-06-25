import { UserAndPrefferncesType, UserType } from "@/../types/userType"

export class LStorage{
    static setUser(loggedUser:{_id:string,acessToken:string}){
      localStorage.setItem("logedPerson" ,JSON.stringify(loggedUser))
    }
  
    static getUser():{_id:string,acessToken:string}|undefined{
  
       const srtUser=localStorage.getItem("logedPerson")
       if(srtUser){
             return  JSON.parse(srtUser)
  
       }
    }
  }