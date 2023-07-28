// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
const LOGIN_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  
) {

const resp = await axios.post(
LOGIN_URL+"/login",
      
      { email: req.body.email, password: req.body.password },
      { withCredentials: true,
       }
    );
    const cookie=resp?.headers['set-cookie']
    if(cookie){

          res.setHeader('Set-Cookie',cookie[0])

    }
   console.log(resp?.headers['set-cookie']);
res.send(resp.data)
}
