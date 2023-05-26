import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import { Mutation, Query } from "@/__generated__/graphql";
import {
  DeleteFollowerGql,
  DeleteFollowingGql,
  getUserAndPrefferencesGql,
  userFriendsGql,
} from "@/gql/user";
import { LStorage } from "@/helpers/user";
import {
  userVar,
  visitedPersonFriendsVar,
  visitedPersonVar,
} from "@/reactive/user";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Settings } from "./profile/Settings";
import { Modal } from "./Modal";
import UserPreview from "./UserPreview";
import {
  useLogginedUserdata,
  usePageFriendsQuery,
  useVisitedPageUser,
} from "@/hooks/user";

function UnsubscribeBtnHandler({
  deletingUser,
  deletingFriendId,
  buttonName,
}: {
  deletingUser: UserType;
  deletingFriendId: string;
  buttonName: "Delete" | "Unsubscribe";
}) {
  const [modal, setModal] = useState(false);
  let DeleteTypeGql =
    buttonName === "Delete" ? DeleteFollowerGql : DeleteFollowingGql;
  const [mutateFunction, { data }] = useMutation<Mutation>(DeleteTypeGql);
  const { data: loggedUser, refetch } = useLogginedUserdata();
  const { data: visitedPage, refetch: visitedPageRefetch } = useVisitedPageUser();
  const { data: profileFriends, refetch: pageFriendRefetch } =
    usePageFriendsQuery(visitedPage?.user?._id, false);

  useEffect(() => {
    pageFriendRefetch();
    visitedPageRefetch();
    refetch();
  }, [data, pageFriendRefetch, refetch, visitedPageRefetch]);
  function friendsHandler() {
    if (!loggedUser) {
      console.log(<>NoLoggedUser</>);
    }
    mutateFunction({
      variables: {
        myId: loggedUser?.user._id,
        candidateId: deletingFriendId,
      },
    });
  }
  return (
    <div>
      {modal && (
        <Modal modal={modal} setModal={() => setModal(!modal)}>
          <div className=" p-10">
            <UserPreview user={deletingUser} />
            <hr />
          </div>
          <Settings>
            <div className=" text-red-500   " onClick={friendsHandler}>
              Are you sure {buttonName}
            </div>
            <div className="  text-blue-400" onClick={() => setModal(!modal)}>
              Cancel
            </div>
          </Settings>
        </Modal>
      )}

      <button
        onClick={() => setModal(!modal)}
        className="submit-btn bg-red-400 hover:bg-red-500"
      >
        {buttonName}
      </button>
    </div>
  );
}

export default UnsubscribeBtnHandler;
