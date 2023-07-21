import { log } from "console"

export function profileImage(url:string|undefined){

    if(url?.search("cloudinary.com")==-1){return "/defaultUser.png"};
    


    return `${url||process.env.NEXT_PUBLIC_SERVER_URL+"/defaultUser.png"}`
}

export function postImage(url:string|undefined){
    console.log(url);
    
    if(url?.search("cloudinary.com")==-1){return ""}

    return `${url||""}`
}