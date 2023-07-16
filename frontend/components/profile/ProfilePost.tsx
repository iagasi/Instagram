import { postType } from "@/../types/postType";
import { gql } from "@/__generated__";
import { Query } from "@/__generated__/graphql";
import { $gePostByIdGql } from "@/gql/post";
import { postImage } from "@/helpers/image";
import {
  useGetPostCommentsAndAuthors,
  useLogginedUserdata,
  useVisitedPageUser,
} from "@/hooks/user";
import { useQuery } from "@apollo/client";
import { log } from "console";
import Image from "next/image";
import React, { useState } from "react";
import OpenPost from "../post/OpenedPost";
import { Modal } from "../Modal";
import { useRouter } from "next/router";
import axios from "axios";
import { UPLOAD_POST_IMAGE_URL } from "@/helpers/constants";

function ProfilePost({ postId,profileId,canDelete }: { postId: string ,profileId:string | string[] | undefined,canDelete:boolean}) {
  const { data: loggedUser } = useLogginedUserdata();
  const {loading,data:visitedPageData,refetch:refetchPageData}=useVisitedPageUser()
// console.log(visitedPageData);

  const [hov, setHov] = useState(false);
  const [modal, setModal] = useState(false);
  const { data } = useQuery<Query>($gePostByIdGql, {
    variables: {
      postId: postId,
    },
  });
  function openPostHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.localName === "img") {
      setModal(!modal);
    }
  }

  async function deletePost( postId:string,profileId:string | string[] | undefined){
    try {
      if(typeof profileId ==="string")
 console.log("here");
       const res=await axios.delete(UPLOAD_POST_IMAGE_URL + "/" + postId+"/"+profileId);
     
console.log(res);

      refetchPageData();
   
    } catch(e) {
      console.log(e);
      
    }
  }
  const { data: logginedUserData } = useLogginedUserdata();
  const postData = data?.getPostById as postType;

  return (
    <div
      className=" relative h-52 w-52 cursor-pointer"
      onClick={(e) => {
        openPostHandler(e);
      }}
      onMouseOver={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {(hov&&canDelete&&(loggedUser.user._id.toString()===profileId?.toString())) && (
        <div className=" absolute z-10 bottom-0  w-full h-[50px] bg-gray-400   flex justify-center items-center ">
          <button
            className="delete-btn bg-slate-50 h-fit w-fit p-1 pl-3 pr-3 rounded-sm hover:bg-slate-200  "
            onClick={(e) => {
          
              deletePost( postId,profileId)
            }}
          >
            Delete
          </button>
        </div>
      )}
      <Image
        src={postImage(postData?.image)}
        alt="uploaded post "
        width={500}
        height={500}
        objectFit="cover"
      />
      {modal && (
        <Modal modal={modal} setModal={() => setModal(!modal)}>
          <OpenPost
            postData={postData}
            currUser={logginedUserData}
            postPublisher={logginedUserData.user}
          />
        </Modal>
      )}
    </div>
  );
}

export default ProfilePost;
