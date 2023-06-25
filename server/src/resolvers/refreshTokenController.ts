import r, { CookieOptions } from "express";
import { refreshAcessToken } from "../services/tokenservice";
import { cookieName } from "../../../constants";
import { log } from "console";
const router = r.Router();



router.post("/refresTokens",async (req,res)=>{
    console.log(req.cookies[cookieName]);
    
   try{
    const tokens= await refreshAcessToken(req.cookies[cookieName])
    if(!tokens)res.sendStatus(401)
        const cookieOptions: CookieOptions = {
        //httpOnly: true,
        maxAge: 1 * 60 * 60 * 24 * 1000,
        secure: true,
      };
      res.cookie(cookieName, tokens?.refreshToken, cookieOptions);  
      res.send({acessToken:tokens?.acessToken,_id:tokens?.user._id})
    return
   }
   catch(e){

   }
 
 res.send()
 
})

export const refreshTokensApi=router