import r, { CookieOptions } from "express";
import { refreshAcessToken } from "../services/tokenservice";
import { UserService } from "../services/userService";
import { cookieName } from "../../../constants";
const router = r.Router();



router.post("/login",async (req,res)=>{

    
   if(!req.body) {
     res.send("No Body")
   return
   }
 
try{


 const resUser = await UserService.login({
        email: req.body.email,
        password: req.body.password,
      });
      const cookieOptions: CookieOptions = {
        //httpOnly: true,
        maxAge: 1 * 60 * 60 * 24 * 1000,
        secure: true,
      };
      res.cookie(cookieName, resUser?.refreshToken, cookieOptions);

     res.json({
        acessToken: resUser?.acessToken,
        _id: resUser?._id,
      });

}
  catch(e){
    res.json(e)
  } 
 
})

router.post("/register",async (req,res)=>{
  UserService.register({email:req.body.email,password:req.body.password,name:req.body.name})
})

export const authApi=router