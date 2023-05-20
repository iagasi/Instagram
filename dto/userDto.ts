import{UserType,UserPrefferencesType} from "../types/userType"

export class UserAndPrefferencesDto{
    user:UserType
    prefferences:UserPrefferencesType
    constructor(user:UserType, prefferences:UserPrefferencesType ){
this.user=user
this.prefferences=prefferences
    }
}


