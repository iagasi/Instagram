import { UserAndPrefferncesType } from "@/../types/userType";
import React from "react";
import ProfileParameters from "../ProfileParameters";
import SubscribeBthHandler from "@/components/SubscribeBthHandler";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/reactive/user";
import UnsubscribeBtnHandler from "@/components/UnsubscribeBtnHandler";
import { DeleteOrAddToFriends } from "@/components/DeleteOrAddToFriends";
import { useLogginedUserdata, useVisitedPageUser } from "@/hooks/user";

type propsType = {
  profileOwner: UserAndPrefferncesType;
};
export function OtherPersonProfile({ profileOwner }: propsType) {
  const { data: visitedPage } = useVisitedPageUser();
  const { data: loggedData } = useLogginedUserdata();
  const weAreSubscribedToEachOther =
    loggedData?.prefferences.followings.includes(visitedPage?.user?._id!) &&
    visitedPage?.prefferences.followers.includes(loggedData?.user?._id!);
  const onlyHeFollowsMe =
    loggedData?.prefferences.followers.includes(visitedPage?.user?._id!) &&
    !loggedData?.prefferences.followings.includes(visitedPage?.user?._id!);
console.log(onlyHeFollowsMe);

  if (onlyHeFollowsMe) {
    return (
      <div className=" space-x-3 flex">
        <SubscribeBthHandler candidate={visitedPage.user} buttonName="Subscribe In Response" />
        <button className="primaryBtn ">Send Message</button>

      </div>
    );
  }
  return (
    <div className=" space-x-3 flex">
      {
        weAreSubscribedToEachOther ? (
          <UnsubscribeBtnHandler
            deletingFriendId={visitedPage.user._id}
            deletingUser={visitedPage.user}
            buttonName="Unsubscribe"
          />
        ) : (
          <SubscribeBthHandler candidate={visitedPage.user} />
        )
        //  <DeleteOrAddToFriends loggedUser={profileOwner.user} friends={} />
      }
      <button className="primaryBtn ">Send Message</button>


      <ProfileParameters />
    </div>
  );
}
