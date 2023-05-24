import { postType } from "@/../types/postType";
import { gql } from "@/__generated__";
import { Query } from "@/__generated__/graphql";
import { $gePostByIdGql } from "@/gql/post";
import { postImage } from "@/helpers/image";
import { useGetPostCommentsAndAuthors, useLogginedUserdata } from "@/hooks/user";
import { useQuery } from "@apollo/client";
import { log } from "console";
import Image from "next/image";
import React, { useState } from "react";
import OpenPost from "../post/OpenedPost";
import { Modal } from "../Modal";

function ProfilePost({ postId }: { postId: string }) {
  const [modal, setModal] = useState(false);
  const { data } = useQuery<Query>($gePostByIdGql, {
    variables: {
      postId: postId,
    },
  });

  const {data:logginedUserData}=useLogginedUserdata()
  const postData = data?.getPostById as postType;

  return (
    <div className=" bg-slate-500 h-52 w-52" onClick={()=>setModal(!modal)}>
      <Image
        src={postImage(postData?.image)}
        alt="uploaded post "
        width={500}
        height={500}
      />
      {modal && (
        <Modal modal={modal} setModal={()=>setModal(!modal)}>
          <OpenPost postData={postData} currUser={logginedUserData}  postPublisher={logginedUserData.user}/>
        </Modal> 
      )}
    </div>
  );
}

export default ProfilePost;
