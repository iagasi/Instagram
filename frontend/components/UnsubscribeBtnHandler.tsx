import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import { Mutation, Query } from "@/__generated__/graphql";
import {
  DeleteFollowerGql,
  DeleteFollowingGql,
  getUserAndPrefferencesGql,
  userFriendsGql,
} from "@/gql/user";
import { LStorage } from "@/helpers/user";
import { userVar } from "@/reactive/user";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Settings } from "./profile/Settings";
import { Modal } from "./Modal";
import UserPreview from "./UserPreview";

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
  const loggedUser = useReactiveVar(userVar);
  let DeleteTypeGql =
    buttonName === "Delete" ? DeleteFollowerGql : DeleteFollowingGql;

  const [mutateFunction, { data, loading, error }] =
    useMutation<Mutation>(DeleteTypeGql);

  const { refetch: refetchFriends } = useQuery<Query>(userFriendsGql, {
    variables: { id: loggedUser?.user._id },
    skip: true,
  });

  useEffect(() => {
    refetchFriends();
  }, [data, refetchFriends]);
  function friendsHandler() {
    if (!loggedUser) {
      return;
    }
    mutateFunction({
      variables: {
        myId: loggedUser.user._id,
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
