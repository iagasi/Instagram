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
    const[hov,setHov]=useState(false)
  const [modal, setModal] = useState(false);
  const { data } = useQuery<Query>($gePostByIdGql, {
    variables: {
      postId: postId,
    },
  });

  const {data:logginedUserData}=useLogginedUserdata()
  const postData = data?.getPostById as postType;

  return (
    <div className=" relative h-52 w-52 cursor-pointer"
     onClick={()=>setModal(!modal)}
      onMouseOver={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}>
        {hov&&<div className=" fixed top-0 left-0   w-[100px] h-[100px] bg-slate-500 flex justify-center items-center "><button className="delete-btn bg-slate-50 h-fit w-fit p-1 rounded-sm ">Delete</button></div>}
      <Image
        src={postImage(postData?.image)}
        alt="uploaded post "
        width={500}
        height={500}
        objectFit="cover"
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
