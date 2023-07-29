import r, { CookieOptions } from "express";
import { refreshAcessToken } from "../services/tokenservice";
import { UserService } from "../services/userService";
import { cookieName } from "../../../constants";
import { FRONTEND_URL } from "../serverConstants";
const router = r.Router();

router.get("/log-out",(req,res)=>{
//  res.cookie(cookieName,"",{    expires: new Date('2016-10-05'),
//       })
      
  res.clearCookie(cookieName)
  res.send("logout")
})

router.post("/login",async (req,res)=>{

    
   if(!req.body) {
    console.log("no req body");
    
     res.send("No Body")
   return
   }
 
try{


 const resUser = await UserService.login({
        email: req.body.email,
        password: req.body.password,
      });

      console.log(FRONTEND_URL);
      
      const cookieOptions: CookieOptions = {
        httpOnly: false,
       sameSite:"none",
       maxAge: 1 * 60 * 60 * 24 * 1000,
      secure:false
      };
    res.cookie(cookieName, resUser?.refreshToken, cookieOptions);
 

     res.json({
        acessToken: resUser?.acessToken,
        _id: resUser?.userId,
      });

}
  catch(e :any){
    
    res.json(e.message)
  } 
 
})

router.post("/register",async (req,res)=>{
const answer= await UserService.register({email:req.body.email,password:req.body.password,name:req.body.name,surname:req.body.surname})
res.send(answer)

})

export const authApi=router