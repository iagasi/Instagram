import { postType } from "@/../types/postType";
import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import { gql } from "../../__generated__/gql";

import React from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/reactive/user";
import IsMyFriend from "../IsMyFriend";
import { UserType } from "@/../types/userType";
import UserPreview from "../UserPreview";
import Loading from "../Loading";
import { useLogginedUserdata } from "@/hooks/user";
type openLikeType = {
  postData: postType;
};
const getPostUsers = gql(`
query getPostLikedPersons($id:String){
 
    getPostLikedPersons(postId:$id) {
        _id,
      name,
      surname,
      image
    }
  }
`);

function OpenLikes(props: openLikeType) {
  const {data:loggedPerson} = useLogginedUserdata()
  const { data } = useQuery(getPostUsers, {
    variables: { id: props.postData._id },
    pollInterval:100

  });

  if (!data?.getPostLikedPersons ||!loggedPerson) {
    return <Loading size="40"/>;
  }

  const postLikers = data.getPostLikedPersons as UserType[];
  return (
    <div className="text-lg p-2 max-lg:text-sm">
        <h2 className=" border-b-2 pb-4 text-xl text-center  fo">Marks Like</h2>
      {postLikers.map((e) => {
        return <div key={e._id} className=" flex justify-between items-center ">
            <UserPreview user={e}/>
            <IsMyFriend loggedPerson={loggedPerson} candidate={e}/>

        </div>;
      })}
    </div>
  );
}

function PostLikeMakers(props: withModalType & Basetype) {
  return (
    <div
      className="cursor-pointer  hover:text-gray-300  text-xl"
      onClick={() => props.setModal()}
    >
      <strong>{props.likes?.length}</strong> Likes
    </div>
  );
}
type Basetype = {
  likes: Array<string>;
};

export default WithModal<Basetype & openLikeType, openLikeType>(
  PostLikeMakers,
  OpenLikes
);
