import { WithModal } from "@/Hoc/WithModal";
import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Settings } from "./Settings";
import { withModalType } from "@/types/modalTypes";

function ProfileParameters({ modal, setModal }: withModalType) {
  return (
    <BiDotsHorizontalRounded
      className=" text-2xl cursor-pointer"
      onClick={setModal}
    />
  );
}
function OpenedProfileParameters() {
  return (
    <>
      <Settings>
        <h1>Hello</h1>
      </Settings>
    </>
  );
}
export default WithModal(ProfileParameters, OpenedProfileParameters);
