import { UserType } from "./userType"
export type connectedUserType=UserType&{
    socketId:string
}

export type connectType={
    user: UserType,
    from:string,
    to:string,
    signal:any
}