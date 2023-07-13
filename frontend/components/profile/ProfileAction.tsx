import React, { useState } from "react";
import SahrePosts from "./SharePosts";
import { UserAndPrefferncesType } from "@/../types/userType";
import ProfilePost from "./ProfilePost";
import { useRouter } from "next/router";
import { useLogginedUserdata } from "@/hooks/user";

export function ProfileActions({ data }: { data: UserAndPrefferncesType }) {
  const [checked, setChecked] = useState<null | number>(0);
  const{data:loggedUser}=useLogginedUserdata()
  const router=useRouter()
 // console.log(router.query.id===loggedUser.user._id);
  
  return (
    <div className="   ">
      <div className="">
        <div className=" h-[1px] w-full bg-gray-200"> </div>
        <div className=" flex mx-auto w-fit space-x-20  ">
          <p
            className={` cursor-pointer p-2  border-black ${
              checked == 0 && "border-t-2"
            }`}
            onClick={() => setChecked(0)}
          >
            Posts
          </p>
          <p
            className={` cursor-pointer p-2  border-black ${
              checked == 1 && "border-t-2"
            }`}
            onClick={() => setChecked(1)}
          >
            Saved
          </p>
          <p
            className={` cursor-pointer p-2  border-black ${
              checked == 2 && "border-t-2"
            }`}
            onClick={() => setChecked(2)}
          >
            Tagged
          </p>
        </div>
      </div>
      <div className=" pt-10 grid grid-cols-3 gap-1 w-fit m-auto max-lg:grid-cols-2 max-md:grid-cols-1 ">
        {checked == 0 &&
          data &&
          data?.prefferences?.posts?.map((postId) => (
            <ProfilePost key={postId} postId={postId} profileId={router.query.id}  canDelete={true}/>
          ))}


        {checked == 1 &&
          data &&
          data.prefferences.saved.map((savedPostId) => (
            <ProfilePost key={savedPostId} postId={savedPostId} profileId={router.query.id}  canDelete={false}/>
          ))}
      </div>
      
      {(checked == 0&&router.query.id===loggedUser.user._id) && <SahrePosts />}
    </div>
  );
}
