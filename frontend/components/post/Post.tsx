import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import UserPreview from "../UserPreview";
import { UserType } from "@/../types/userType";
import { gql, useQuery } from "@apollo/client";
import { LikePost } from "./LikePost";
import CommentPost from "./CommentPost";
import { postImage } from "@/helpers/image";
import { useLogginedUserdata } from "@/hooks/user";
import { useGetPostById } from "@/hooks/post";
import { Modal } from "../Modal";
import OpenPost from "./OpenedPost";
import PostSettings from "./PostSettings";
import { postType } from "../../../types/postType";
import CreateChat from "./CreateChat";
import { TbMessageCircle2 } from "react-icons/tb";
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

export function Post({
  postId,
  post,
}: {
  postId: string | undefined;
  post: postType;
}) {
  const { data: currUser } = useLogginedUserdata();
  const { data: cardData, refetch } = useGetPostById(postId);
  const { data } = useQuery(query, {
    variables: { id: cardData?.userId },
    skip: !cardData,
  });
  const [modal, setModal] = useState(false);

  const postPublisher = data?.findUser as UserType;

  return (
    <div className="  pb-4 w-fit  mt-10 border-t-2 ">
      <div className=" flex justify-between ">
        <UserPreview user={postPublisher} />
        <PostSettings post={post} postMaker={postPublisher} />
      </div>
      <div
        className=" cursor-pointer hover:opacity-80"
        onClick={() => setModal(!modal)}
      >
        <Image
          className=" w-[468px] h-[526px]"
          src={postImage(cardData?.image)}
          alt="Card Image"
          width={468}
          height={526}
          objectFit="cover"
        />
      </div>
<div className=" flex">
  <LikePost postData={cardData} currUser={currUser} refetch={refetch} />
      <CreateChat postCreator={postPublisher}>
        <div>
          <TbMessageCircle2 size={30} />
        </div>
      </CreateChat>

</div>
    
      <div className=" space-y-1" onClick={() => setModal(!modal)}>
        <CommentPost
          postData={cardData}
          currUser={currUser}
          postPublisher={postPublisher}
        />
      </div>
      {modal && (
        <Modal modal={modal} setModal={setModal}>
          <OpenPost
            postData={cardData}
            currUser={currUser}
            postPublisher={postPublisher}
          />
        </Modal>
      )}
    </div>
  );
}
