// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
const LOGIN_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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

          res.setHeader('Set-Cookie',"Instagram_Cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGEzMDdlZDlmMmU0ZWEzMTg5NzNmNjAiLCJuYW1lIjoiTGluZGEiLCJpYXQiOjE2OTAwNTgxMjIsImV4cCI6MTY5MDkyMjEyMn0.01_RllEzq4i0D1vp49My1LG8D9cSMnY_S0G3FSJHle4=; path=/;  Secure; SameSite=None")

    }
   console.log(resp?.headers['set-cookie']);
res.send(resp.data)
}
