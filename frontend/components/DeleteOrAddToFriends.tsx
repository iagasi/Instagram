import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import React from "react";
import UserPreview from "./UserPreview";
import { useReactiveVar } from "@apollo/client";
import { userVar, visitedPersonVar } from "@/reactive/user";
import { LStorage } from "@/helpers/user";
import UnsubscribeBtnHandler from "./UnsubscribeBtnHandler";
import SubscribeBthHandler from "./SubscribeBthHandler";
function isHeFollowsMe(user1: UserAndPrefferncesType, user2: UserType) {
  return user1.prefferences.followers.includes(user2._id);
}
function isIfollowHim(user1: UserAndPrefferncesType, user2: UserType) {
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
  const profileOwner = useReactiveVar(visitedPersonVar);
  const loggedUser = useReactiveVar(userVar);
const itIsMyProfile=loggedUser?.user?._id === profileOwner?.user?._id
  if (!loggedUser) {
    return <> Error No logged person</>;
  }

  return (
    <div className=" p-3 flex flex-col  items-start">
      {friends.map((person) => {
        if (person._id === loggedUser?.user?._id) {
          return <UserPreview key={person._id} user={person} />;
        }
        if (itIsMyProfile) {
          return (
            <div
              key={person._id}
              className=" flex justify-between items-center w-full"
            >
              <UserPreview user={person} />
              {}
              {!isIfollowHim(loggedUser, person) && (
                <div className=" flex space-x-1">
                  <SubscribeBthHandler />
                  <UnsubscribeBtnHandler
                    deletingUser={person}
                    deletingFriendId={person._id}
                    buttonName={buttonName}
                  />
                </div>
              )}
              {isIfollowHim(loggedUser, person) && (
                <div className=" flex space-x-1">
                  <UnsubscribeBtnHandler
                    deletingUser={person}
                    deletingFriendId={person._id}
                    buttonName={buttonName}
                  />
                </div>
              )}
            </div>
          );
        }

        return(
          <div
          key={person._id}
          className=" flex justify-between items-center w-full"
        >
          <UserPreview user={person} />
          {}
          {!isIfollowHim(loggedUser, person) && (
            <div className=" flex space-x-1">
              <SubscribeBthHandler />

            </div>
          )}
          {isIfollowHim(loggedUser, person) && (
             <div className="  text-blue-500">You follow him</div>
          )}
        </div>
        )
      })}
    </div>
  );
}
