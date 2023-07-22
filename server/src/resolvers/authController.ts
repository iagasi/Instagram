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
     res.send("No Body")
   return
   }
 
try{


 const resUser = await UserService.login({
        email: req.body.email,
        password: req.body.password,
      });
      const cookieOptions: CookieOptions = {
        httpOnly: false,
        maxAge: 1 ,
        domain:FRONTEND_URL,
        secure: true,
      };
      res.cookie(cookieName, resUser?.refreshToken, cookieOptions);

     res.json({
        acessToken: resUser?.acessToken,
        _id: resUser?.userId,
      });

}
  catch(e :any){
    console.log(e.message);
    
    res.json(e.message)
  } 
 
})

router.post("/register",async (req,res)=>{
const answer= await UserService.register({email:req.body.email,password:req.body.password,name:req.body.name,surname:req.body.surname})
console.log(answer);
res.send(answer)

})

export const authApi=router