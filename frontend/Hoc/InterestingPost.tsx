import OpenPost from "@/components/post/OpenedPost";
import React, { useState } from "react";
import { postType } from "../../types/postType";
import { gql, useQuery } from "@apollo/client";
import { useLogginedUserdata } from "@/hooks/user";
import { UserType } from "../../types/userType";
import { Modal } from "@/components/Modal";
const query = gql(`
query findUser($id:String){
  findUser(id:$id) {
       _id
    name
    surname
    image
  }
}
`);
export function WithPost(
 

  Component: ({post}:{post:postType}) => JSX.Element
) {
  
  return function FN ({post}:{post:postType}){
    const [modal, setModal] = useState(false);
  const { data: currUser } = useLogginedUserdata();
  const { data } = useQuery(query, {
    variables: { id: post?.userId },
    skip: !post,
  });

  const postPublisher = data?.findUser as UserType;

   return <>
   
   {modal&&
    <Modal modal={modal} setModal={() => setModal(!modal)}>
        <OpenPost
          currUser={currUser}
          postPublisher={postPublisher}
          postData={post}
        />
      </Modal>
   }
      <div onClick={() => setModal(!modal)}>
        <Component post={post} />
      </div>
    </>
  }
     
  
}


