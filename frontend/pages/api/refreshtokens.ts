import { SERVER_URL } from '@/helpers/constants';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookieName } from '../../../constants';

type Data = {
  name: string
}
const LOGIN_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  
) {
    console.log("ref");
    
    
const c=req.cookies[cookieName]
      const resp = await axios.post(
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
