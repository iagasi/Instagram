import{UserType,UserPrefferencesType} from "../types/userType"
type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
type MyMappedType = {
    [P in keyof UserType]: UserType[P]|undefined;
  };
  

export class UserAndPrefferencesDto{
    user:UserType
    prefferences:UserPrefferencesType
    constructor(user:any, prefferences:any ){
this.user=user
this.prefferences=prefferences
    }
}


