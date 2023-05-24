import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import UserPreview from "../UserPreview";
import { UserType } from "@/../types/userType";
import { gql, useQuery,} from "@apollo/client";
import { LikePost } from "./LikePost";
import CommentPost from "./CommentPost";
import { postImage } from "@/helpers/image";
import { useLogginedUserdata } from "@/hooks/user";
import { useGetPostById } from "@/hooks/post";
import { Modal } from "../Modal";
import OpenPost from "./OpenedPost";
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

export function Post({postId }: { postId: string | undefined }) {
const {data:currUser}=useLogginedUserdata()
const {data:cardData,refetch}=useGetPostById(postId)
  const { data } = useQuery(query, {
    variables: { id: cardData?.userId.toString(),
     },
     skip:!cardData
  });
  const [modal, setModal] = useState(false);

const postPublisher=data?.findUser as UserType
console.log(cardData);

  return (
    <div className="  pb-4 w-fit  mt-10 border-t-2 ">
      <div className=" flex justify-between ">
        <UserPreview user={postPublisher} />
        <BsThreeDots className=" text-3xl cursor-pointer" />
      </div>
      <Image
        className=" w-[468px] h-[526px]"
        src={postImage(cardData?.image)}
        alt="Card Image"
        width={468}
        height={526}
        objectFit="cover"
      />
      <LikePost postData={cardData} currUser={currUser} refetch={refetch} />
      <div className=" space-y-1"  onClick={() => setModal(!modal)}>
        <CommentPost postData={cardData} currUser={currUser} postPublisher={postPublisher} />
      </div>
      {modal  && (
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
