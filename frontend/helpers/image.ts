import { log } from "console"

export function profileImage(url:string|undefined){

    if(url?.search("cloudinary.com")==-1){return "/defaultUser.png"};
    


   return ``
}

export function postImage(url:string|undefined){
    console.log(url);
    
    if(url?.search("cloudinary.com")==-1){return ""}

    return `${url||""}`
}