"use client";

import { useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { ProfileTop } from "./ProfileTop";
import { ProfileActions } from "./ProfileAction";
import { UserAndPrefferncesType } from "../../../types/userType";
import { userVar, visitedPersonVar } from "@/reactive/user";
import { Sidebar } from "../Sidebar";
import { getUserAndPrefferencesGql } from "@/gql/user";
import { LStorage } from "@/helpers/user";
import { Query } from "@/__generated__/graphql";

function Profile() {
  const router = useRouter();
  const RouterId = router.query.id as string;

  const { loading, data } = useQuery(getUserAndPrefferencesGql, {
    variables: { Id: RouterId },
    skip: !router.isReady,
  });
  const visitedUserData = data?.getUserData as UserAndPrefferncesType;

  

  const { data: loggedUserData } = useQuery<Query>(getUserAndPrefferencesGql, {
    variables: { Id: LStorage.getUser()?.user?._id },
    skip: !LStorage.getUser()?.user?._id,
  });
  const loggedData = loggedUserData?.getUserData as UserAndPrefferncesType;





    userVar(loggedData);
    visitedPersonVar(visitedUserData);


  if (loading) {
    return <p className=" text-4xl">Loading</p>;
  }

  return (
    <div className="">
      <div className=" flex ">
        <Sidebar />
        <div className=" flex-1">
          <ProfileTop visitedUser={visitedUserData} />
          <ProfileActions data={visitedUserData} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
