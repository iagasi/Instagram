import { log } from "console"

export function profileImage(url:string|undefined){

    if(url?.search("cloudinary.com")==-1){return "/defaultUser.png"};
    


   return `${url||"/defaultUser.png"}`
}

export function postImage(url:string|undefined){
    
    if(url?.search("cloudinary.com")==-1){return ""}

    return `${url||"/loading-img.png"}`
}