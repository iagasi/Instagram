import Image from "next/image";
import Loading from "../Loading";
import UserPreview from "../UserPreview";
import CommentPost from "./CommentPost";
import { Comment } from "./Comment";
import { useQuery } from "@apollo/client";
import { combinedUserAndCommentType, postType } from "@/../types/postType";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";

import { gql } from "../../__generated__/gql";
import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import { ReactNode, useEffect } from "react";

const GetCommentPost = gql(`
query GetCommentPost($postId:String){
  getPostCommentsAndAuthors(postId:$postId) {
commentMaker {
  name
  image
}
 comment {
   message
   time
   
 }
    
  }
}`);
type props = {
  postData: postType | undefined;
  currUser: UserAndPrefferncesType | null;
  postPublisher: UserType;
  setOuterPostComments:(value:Array<string>)=>void

};
function OpenPost(props: props) {
  const { data,refetch } = useQuery(GetCommentPost, {
    variables: { postId: props.postData?._id },
    skip: !props.postData?._id,
    pollInterval:500
  });

  const commetsAndUsers =  data?.getPostCommentsAndAuthors as combinedUserAndCommentType[];
  function refetchPosts(){
    refetch()
    return commetsAndUsers
  }


  if (!props.postData || !props.postPublisher) {
    return <div className=" bg-red-800 p-6">Error</div>;
  }
  return (
    <div className=" relative w-[70vw] h-[80vh] flex ">
      <div className=" w-3/5 h-full relative bg-slate-200  flex justify-start ">
        <div className="  ">
          <Image
            src={"/test.jpg"}
            alt="user Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className=" pl-5  h-3/4">
        <div>
          <UserPreview user={props.postPublisher} />
          <hr />
        </div>

        {!data && (
          <div className=" flex justify-center pt-10">
            <Loading size="40" />
          </div>
        )}
        <div className=" h-full flex flex-col justify-between">
          <div className=" overflow-y-scroll ">
            {commetsAndUsers?.map((comment, index) => (
              <Comment key={index} {...comment} />
            ))}
          </div>

          <div className="sticky top-0 w-3/4">
            <CommentPost {...props} refetchPosts={refetchPosts} />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

type openType = withModalType & { Content: () => JSX.Element };

function OpenModal(props: openType) {
  return (
    <div onClick={() => props.setModal()}>
      <props.Content />
    </div>
  );
}

export default WithModal(OpenModal, OpenPost);
