import { gql } from '@apollo/client'
import React from 'react'
const SubscribeGql= gql(` mutation SubscribeGql($myId:String $candidateId:String){
  subscribeTo (input:{myId:$myId candidateId:$candidateId }) {
   user {
     _id
   }
   prefferences {
     followings
     followers
   }
  }
  }`)
function SubscribeBthHandler() {
    
  return (
    <button className="  text-blue-700 font-bold">Subscribe!</button>
  )
}

export default SubscribeBthHandler