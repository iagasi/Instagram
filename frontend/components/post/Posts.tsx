import { userVar } from '@/reactive/user';
import { useQuery,gql, useReactiveVar } from '@apollo/client'
import { postType } from "@/../types/postType";

import React from 'react'
import { Post } from './Post';
import { postVar } from '@/reactive/post';
const query = gql`
query ($id:String){
 
    getFriendsPosts(id:$id) {
      _id
      likes
      comments
      userId
      image
    }
  }
`;
function Posts() {
    const user=useReactiveVar(userVar)
    const {data}=useQuery(query,{variables: { id: user?.user._id }})
    postVar()
 
const posts:postType[]=data?.getFriendsPosts
postVar(posts)
  
  return (
    <div>


{
    posts?.map((post)=>{
      return  <Post  key={post._id}cardData={post}/>
    })
}
    </div>
  )
}

export default Posts