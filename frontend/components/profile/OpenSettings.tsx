import { WithModal } from "@/Hoc/WithModal";
import React from "react";
import { Settings } from "./Settings";
import { SlSettings } from "react-icons/sl";

type withModalType = {
  modal: boolean;
  setModal: () => void;
};
function OpenSettings({ modal, setModal }: withModalType) {
  return (
    <div className="">
      <SlSettings className=" w-8 h-8 cursor-pointer" onClick={() => setModal()} />
    </div>
  );
}

export default WithModal(OpenSettings, Settings);
