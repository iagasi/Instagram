import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookieName } from '../../../constants';

type Data = {
  name: string
}
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  
) {
    console.log("refff");
   
       console.log(SERVER_URL);

const c=req.cookies[cookieName]
   
       try{
         const resp=   await axios.post(
        SERVER_URL + "/refresTokens",{},
       {headers:{ "instacookie":c
       }}
      );
      const cookie=resp?.headers['set-cookie']
      if(cookie){
  
        res.setHeader('Set-Cookie',cookie[0])
  
      }
      
     console.log(resp.data);
  res.send(resp.data)
      }
  catch(e){
    console.log(e);
    
    res.send("err")
    
  }
if(!res){
  return
}

}
