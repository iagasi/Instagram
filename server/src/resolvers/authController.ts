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
console.log("log-here");


 const resUser = await UserService.login({
        email: req.body.email,
        password: req.body.password,
      });
      console.log("url");

      console.log(FRONTEND_URL);
      
      const cookieOptions: CookieOptions = {
        httpOnly: false,
        maxAge: 1 ,
       sameSite:"none",
       domain:"instagram-urgy.onrender.com",
       secure:true,
      };
     res.cookie(cookieName, resUser?.refreshToken, cookieOptions);
      res.set('set-cookie', 'sdsdfsdfsfsdfsdf');
      res.set('zzz', 'text/plcxzain');
      res.set('xxx', 'text/plcxzain');

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