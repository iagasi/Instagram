import type { NextApiRequest, NextApiResponse } from 'next'
import { cookieName } from '../../../constants'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    
  ) {
  
 
 res.setHeader('Set-Cookie',`${cookieName}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'`)
  
      
  res.send({})
  }