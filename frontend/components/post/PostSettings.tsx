import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Settings } from "../profile/Settings";
import { postType } from "../../../types/postType";
import { Modal } from "../Modal";
import { useMutation } from "@apollo/client";
import { Mutation } from "@/__generated__/graphql";
import { DeleteFollowingGql } from "@/gql/user";
import { useLogginedUserdata } from "@/hooks/user";
import UserPreview from "../UserPreview";
import { UserType } from "../../../types/userType";
import { useGetFriendsPosts } from "@/hooks/post";
import Loading from "../Loading";

function PostSettings(props: withModalType & { post: postType, postMaker:UserType }) {
  const [modal, setModal] = useState(false);
  const {data:loggedUser}=useLogginedUserdata()
  const{posts,refetch}=useGetFriendsPosts()

  const [action, setAction] = useState<"unsubscribe" | "hide" | "">("");
  const [mutateFunction, { data,loading }] = useMutation<Mutation>(DeleteFollowingGql);
  useEffect(()=>{
    if(data){
        refetch()
    }
  },[data])
function unsubscribeHandler(){
    mutateFunction({
        variables: {
          myId: loggedUser?.user._id,
          candidateId:props.postMaker._id,
        },
      });
}
  return (
    <div>
      <Settings>
        {/* <div
          className=" text-red-500 w-[200px]"
          onClick={() => {
            setAction("hide");
            setModal(!modal);
          }}
        >
          Hide This Post
        </div>  */}
        <div
          className=" text-red-500 w-[200px]"
          onClick={() => {
            setAction("unsubscribe");
            setModal(!modal);
          }}
        >
          Unsubscribe
        </div>
        <div
          onClick={() => {
            props.setModal();
          }}
        >
          Cancel
        </div>
      </Settings>
      {modal && (
        <Modal modal={modal} setModal={() => setModal(!modal)}>
          <div className="  ">
            {action === "unsubscribe" && (
              <div>
                <div className=" sidebar-elem text-red-500 p-5 font-bold"
                
                onClick={unsubscribeHandler}
                >{! loading?"Are You sure unsubscribe from":<Loading size="40"/>}</div>

                <UserPreview user={props.postMaker} />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

const PostSettingsOpener = (props: withModalType) => {
  return (
    <div onClick={() => props.setModal()}>
      <BsThreeDots className=" text-3xl cursor-pointer" />
    </div>
  );
};

export default WithModal(PostSettingsOpener, PostSettings);
