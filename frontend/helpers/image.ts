import { log } from "console"

export function profileImage(url:string|undefined){
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/${url||"defaultUser.png"}`
}

export function postImage(url:string|undefined){
    
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/${url||""}`
}