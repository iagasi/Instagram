import { userVar } from '@/reactive/user'
import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Card } from './Card'
import { log } from 'console';
const query = gql`
  query ($Id: String) {
    getUserData(id: $Id) {
      user {
        _id
        name
        surname
      }
      prefferences {
        followers
        followings
        posts
      }
    }
  }
`;
export function Main() {
    const userId="1"
    const {data}=useQuery(query,{variables: { Id: userId }})
    userVar(data?.getUserData)
    console.log(data);
    
  return (
    <main className=' flex w-full justify-center -z-20'>

        <Card user={data?.getUserData.user}/>
    </main>
  )
}

