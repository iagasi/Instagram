import Image from "next/image";
import React from "react";

import { UserAndPrefferncesType } from "../../../types/userType";
import OpenSettings from "./OpenSettings";
import EditProfile from "./EditProfile";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/reactive/user";
import { OtherPersonProfile } from "./othetPerson/OtherPersonProfile";

export function ProfileTop({ data }: { data: UserAndPrefferncesType }) {
  const router = useRouter();
  const currLoggedUser = useReactiveVar(userVar);
  if (!data?.prefferences?.posts) {
    return <div>Loading</div>;
  }
  const myProfile = router.query.id == currLoggedUser?.user._id;

  return (
    <div className=" flex mx-auto space-x-20 pb-8 pt-8 pl-20">
      <Image
        className=" rounded-full h-[150px] w-[150px]"
        src={"/test.jpg"}
        height={150}
        width={150}
        alt="profile image"
      />
      <div className=" space-y-5">
        <div className=" justify-between flex content-center">
          <p className=" self-center">User Id </p>
          {myProfile ? (
            <>
              <EditProfile />
              <OpenSettings />
            </>
          ) : (
            <OtherPersonProfile currLoggedUser={currLoggedUser} thisUser={data} />
          )}
        </div>
        <div className="  flex space-x-5">
          <p> {data?.prefferences.posts.length} posts</p>
          <p> {data?.prefferences.followers.length} folowers</p>
          <p> {data?.prefferences.followings.length} following</p>
        </div>
        <span className=" font-bold"> {data?.user.name}</span>
        <span className=" font-bold"> {data?.user.surname}</span>
      </div>
    </div>
  );
}
