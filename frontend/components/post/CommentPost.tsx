import { postType } from "@/../types/postType";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import React, { useState } from "react";
type props= {
   postData: postType | undefined 
  currUser:UserAndPrefferncesType|null
  
  }

function CommentPost({ postData ,currUser}:props) {
  const [comments, setComments] = useState(postData?.comments);
  return (
    <div>
      <p className=" cursor-pointer  hover:text-gray-300">
        See all <strong> {comments?.length}</strong> comments
      </p>
      <input className="focus:outline-0" placeholder="Add Comment" />

    </div>
  );
}

export default CommentPost;
