"use client";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { log } from "console";
import { ProfileTop } from "./ProfileTop";
import { ProfileActions } from "./ProfileAction";
import { UserType, UserPrefferencesType } from "../../../types/userType";
import { useEffect, useState } from "react";

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

export function Profile() {
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
  console.log(data);
  Profile;
  return (
    <>
      <ProfileTop data={foundData} />
      <ProfileActions />
    </>
  );
}
