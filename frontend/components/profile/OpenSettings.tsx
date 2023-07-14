import { WithModal } from "@/Hoc/WithModal";
import React from "react";
import { Settings } from "./Settings";
import { SlSettings } from "react-icons/sl";
import { withModalType } from "@/types/modalTypes";
import LogOutBtn from "../LogOutBtn";

function OpenSettings({ modal, setModal }: withModalType) {
  return (
    <div className="">
      <SlSettings
        className=" w-8 h-8 cursor-pointer"
        onClick={() => setModal()}
      />
    </div>
  );
}
function OpenedSettings({ setModal }: { setModal: () => void }) {
  return (
    <>
      <Settings>
        <LogOutBtn />

        <div
          className=" text-blue-500  w-[200px] "
          onClick={() => setModal()}
        >
       
          Cancel
        </div>
      </Settings>
    </>
  );
}
export default WithModal(OpenSettings, OpenedSettings);
