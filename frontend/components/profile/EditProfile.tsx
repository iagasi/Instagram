import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import React from "react";
import UserPreview from "../UserPreview";

function EditProfileBtn(props: withModalType) {
  return (
    <>
      <button
        className=" bg-gray-400 p-2 rounded-lg"
        onClick={() => props.setModal()}
      >
     
        Edit pofile
      </button>
    </>
  );
}
function EditProfile(props:Pick<withModalType,"setModal"> ) {
  return (
    <>
      <UserPreview />
      <div className=" flex flex-col justify-between items-center h-3/4 font-medium">
        <div className=" flex flex-col justify-between ">
          <button className=" text-blue-800">Change User Photo</button>
          <button className=" text-red-900 text-lg">
            Delete Current Photo
          </button>
        </div>

        <div className=" flex flex-col justify-between  w-3/4 space-y-2">
          <button className=" bg-blue-400 hover:bg-blue-500 p-2 rounded-lg  text-lg text-white"> Update</button>
          <button className=" bg-red-400 hover:bg-red-500 p-2 rounded-lg text-lg text-white" onClick={() => props.setModal()}> Cancell</button>
        </div>
      </div>
    </>
  );
}
export default WithModal(EditProfileBtn, EditProfile);
