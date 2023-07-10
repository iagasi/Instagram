import Image from "next/image";
import Loading from "../Loading";
import UserPreview from "../UserPreview";
import CommentPost from "./CommentPost";
import { Comment } from "./Comment";
import { useQuery } from "@apollo/client";
import { combinedUserAndCommentType, postType } from "@/../types/postType";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";

import { gql } from "../../__generated__/gql";
import { withModalType } from "@/types/modalTypes";
import { postImage } from "@/helpers/image";
import { LikePost } from "./LikePost";
import { useGetPostById } from "@/hooks/post";

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
};
function OpenPost(props: props) {
  const { data, refetch } = useQuery(GetCommentPost, {
    variables: { postId: props.postData?._id },
    skip: !props.postData?._id,
    pollInterval: 4000,
  });
  const { data: cardData, refetch: refetchSinglePost } = useGetPostById(
    props.postData?._id
  );

  const commetsAndUsers =
    data?.getPostCommentsAndAuthors as combinedUserAndCommentType[];
  function refetchPosts() {
    refetch();
    return commetsAndUsers;
  }

  if (!props.postData || !props.postPublisher) {
    return <div className=" bg-red-800 p-6">Error</div>;
  }
  return (
    <div
      className=" relative w-[80vw] h-[90vh] flex justify-between
      max-[1100px]:h-[70vh]
      max-[900px]:h-[50vh]
      max-[900px]:text-sm
    "
    >
      <div className=" w-3/5 h-full relative bg-slate-200  flex justify-start  flex-1 ">
        <div className="  ">
          <Image
            src={postImage(props?.postData?.image)}
            alt="user Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div
        className=" pl-5  h-3/4 w-[30%]  max-2xl:w-[40%] 
       "
      >
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
            <LikePost
              postData={props.postData}
              currUser={props.currUser}
              refetch={refetchSinglePost}
            />
            <CommentPost {...props} refetchPosts={refetchPosts} />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenPost;
