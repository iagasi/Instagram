import React from 'react'
import UserPreview from '../UserPreview'
import { combinedUserAndCommentType } from '@/../types/postType'
import { timeAgo } from '@/common';

 export function Comment({commentMaker,comment}:combinedUserAndCommentType) {
  return (
    <div className=' flex mb-2   text-small relative pb-2'>
        <UserPreview user={commentMaker}/>
        <div className=' pt-4   break-words  w-[60%]'> {comment.message}</div>
        <small className=' absolute bottom-0 left-0 font-bold'>{timeAgo.format(Number(comment.time)) }</small>
    </div>
  )
}

