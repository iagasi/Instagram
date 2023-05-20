import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import { Settings } from "./Settings";
import { useState } from "react";
import { Modal } from "../Modal";

function ChangePhoto(props: withModalType) {
  return (
    <button
      className=" text-blue-800 absolute right-0 bottom-0 "
      onClick={() => props.setModal()}>
      Change User Photo
    </button>
  );
}
export default WithModal(ChangePhoto, OpenOptions);

function OpenOptions(props: withModalType) {
  const [del, setDel] = useState(false);

  return (
    <div className="  space-y-5 w-[300px]">
      <Settings>
        <label className=" text-blue-600 w-full block">
          Upload New Photo
          <input className=" hidden" type="file" />
        </label>
        <div className="delete-btn" onClick={() => setDel(!del)}>
          Delete Photo
        </div>
        {del && (
          <Modal modal={del} setModal={setDel}>
            <div>
              <Settings>
                <div className="delete-btn w-[250px]"
                onClick={() => setDel(!del)}>Delete</div>
                <div className=" cursor-pointer"
                onClick={() => setDel(!del)}>Cancell</div>
              </Settings>
            </div>
          </Modal>
        )}
        <div onClick={() => props.setModal()}>Cancell</div>
      </Settings>
    </div>
  );
}


