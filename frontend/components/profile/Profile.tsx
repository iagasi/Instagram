"use client";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { log } from "console";
import { ProfileTop } from "./ProfileTop";
import { ProfileActions } from "./ProfileAction";
import { UserType, UserPrefferencesType } from "../../../types/userType";
import { useEffect, useState } from "react";
import {WithModal } from "../../Hoc/WithModal";

const query = gql`
  query ($Id: String) {
    getUserData(id: $Id) {
      user {
        _id
        name
        surname
      }
      prefferences {
        followers
        followings
        posts
      }
    }
  }
`;
type propsType={
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
 function Profile({modal,setModal}:propsType) {
  const router = useRouter();
  const [shSkip, setShSkip] = useState(true);
  const UserId = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;

    if (UserId) {
      if (UserId) setShSkip(false);
    }
  }, [UserId, router.isReady]);

  const { loading, data } = useQuery(query, {
    variables: { Id: UserId },
    skip: shSkip,
  });
  const foundData = data?.getUserData as {
    user: UserType;
    prefferences: UserPrefferencesType;
  };

  if (loading) {
    return <p>Loading</p>;
  }
 
  return (
    <>
      <ProfileTop data={foundData} />
      <ProfileActions />
      
    </>
  );
}

export default Profile