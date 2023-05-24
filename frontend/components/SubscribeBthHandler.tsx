import { UserType } from '@/../types/userType';
import { Mutation, Query } from '@/__generated__/graphql';
import { getUserAndPrefferencesGql, userFriendsGql } from '@/gql/user';
import { useLogginedUserdata, usePageFriendsQuery } from '@/hooks/user';
import { userVar, visitedPersonFriendsVar, visitedPersonVar } from '@/reactive/user';
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { log } from 'console';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
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
function SubscribeBthHandler( props:{candidate:UserType}) {
  const router=useRouter()
  const RouterId = router.query.id as string;

  const loggedUser=useReactiveVar(userVar)
  const [mutateFunction, { data}] = useMutation<Mutation>(SubscribeGql);
  const profileOwner = useReactiveVar(visitedPersonVar);

  const { refetch: refetchFriends,data:pageFriends } = usePageFriendsQuery(profileOwner?.user?._id||"" ,true);
  const {data:logginedUser,refetch}=useLogginedUserdata()

  useEffect(()=>{
 refetch()
refetchFriends()
  },[data, refetchFriends, refetch])

  function subscribeHandler(){
mutateFunction({
  variables:{
    myId:loggedUser?.user._id ,
    candidateId: props.candidate._id
  } 
})
  }
  return (
    <button onClick={subscribeHandler} className="  text-blue-700 font-bold">Subscribe</button>
  )
}

export default SubscribeBthHandler