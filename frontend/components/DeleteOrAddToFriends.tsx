import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import React from "react";
import UserPreview from "./UserPreview";
import { useReactiveVar } from "@apollo/client";
import { userVar, visitedPersonVar } from "@/reactive/user";
import { LStorage } from "@/helpers/user";
import UnsubscribeBtnHandler from "./UnsubscribeBtnHandler";
import SubscribeBthHandler from "./SubscribeBthHandler";
import {
  useLogginedUserdata,
  usePageFriendsQuery,
  useVisitedPageUser,
} from "@/hooks/user";
import { log } from "console";
function isHeFollowsMe(user1: UserAndPrefferncesType, user2: UserType) {
  return user1.prefferences.followers.includes(user2._id);
}
function isIfollowHim(user1: UserAndPrefferncesType, user2: UserType) {
  user1.prefferences.followings
  console.log(user2._id);
  
  return user1.prefferences.followings.includes(user2._id);
}

export function DeleteOrAddToFriends({
  friends,
  buttonName,
}: {
  loggedUser: UserAndPrefferncesType;
  friends: UserType[];
  buttonName: "Delete" | "Unsubscribe";
}) {
  const visitedPerson = useReactiveVar(visitedPersonVar);
  const logginedUserData = useReactiveVar(userVar);

  const itIsMyProfile =
    logginedUserData?.user?._id === visitedPerson?.user?._id;
  if (!logginedUserData) {
    return <> Error No logged person</>;
  }
  if (!friends) {
    return <> Error No Friends</>;
  }
  console.log("deloete or add");
  console.log(friends);

  return (
    <div className=" p-3 flex flex-col  items-start">
      {friends.map((person) => {
        if (person._id === logginedUserData?.user?._id) {
          return <UserPreview key={person._id} user={person} />;
        }
 

        return (
          <div
            key={person._id}
            className=" flex justify-between items-center w-full"
          >
            <UserPreview user={person} />

            {!isIfollowHim(logginedUserData, person)?(
              <div className="  text-blue-500">
                <SubscribeBthHandler candidate={person} />
              </div>
           
            )
            :    <div className="  text-red-500">
            <UnsubscribeBtnHandler deletingUser={person} deletingFriendId={person._id} buttonName="Unsubscribe" />
          </div>
          }
          </div>
        );
      })}
    </div>
  );
}
