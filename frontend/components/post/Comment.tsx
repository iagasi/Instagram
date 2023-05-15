import React from 'react'
import UserPreview from '../UserPreview'
import { combinedUserAndCommentType } from '@/../types/postType'

 export function Comment({commentMaker,comment}:combinedUserAndCommentType) {
  return (
    <div className=' flex mb-2 w-full  text-small  relative'>
        <UserPreview user={commentMaker}/>
        <div className=' pt-4   break-words'> {comment.message}</div>
        <small className=' absolute bottom-0 left-16'>3d</small>
    </div>
  )
}

