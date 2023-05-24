import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import { Settings } from "./Settings";
import { ChangeEvent, useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { PROFILE_IMAGE_UPLOAD } from "@/helpers/constants";
import { log } from "console";
import { UserType } from "@/../types/userType";
import { useLogginedUserdata } from "@/hooks/user";
type propsType = withModalType & { user: UserType };
function ChangePhoto(props: propsType) {
  return (
    <button
      className=" text-blue-800 absolute right-0 bottom-0 "
      onClick={() => props.setModal()}
    >
      Change User Photo
    </button>
  );
}
export default WithModal(ChangePhoto, OpenOptions);

function OpenOptions(props: propsType) {
  const [del, setDel] = useState(false);
  const { data: logginedUser, refetch } = useLogginedUserdata();

  async function uploadHadler(e: any) {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const selectedFile = e.target?.files && e.target?.files[0];
    if (!selectedFile || !url) {
      return;
    }
    const formData = new FormData();
    formData.append("File", selectedFile);
    console.log(selectedFile);
    console.log(props);

    await axios.put(PROFILE_IMAGE_UPLOAD + "/" + props.user._id, formData);
    props.setModal()
    refetch();
  }

  async function deletePhoto(){
    await axios.delete(PROFILE_IMAGE_UPLOAD + "/" + props.user._id,);
    props.setModal()
    setDel(!del)
    refetch();
  }
  return (
    <div className="  space-y-5 w-[300px]">
      <Settings>
        <label className=" text-blue-600 w-full block">
          Upload New Photo
          <input
            className=" hidden"
            type="file"
            onChange={(e) => uploadHadler(e)}
          />
        </label>
        <div className="delete-btn" onClick={() => setDel(!del)}>
          Delete Photo
        </div>
        {del && (
          <Modal modal={del} setModal={setDel}>
            <div>
              <Settings>
                <div
                  className="delete-btn w-[250px]"
                  onClick={() => deletePhoto()}
                >
                  Delete
                </div>
                <div className=" cursor-pointer" onClick={() => setDel(!del)}>
                  Cancell
                </div>
              </Settings>
            </div>
          </Modal>
        )}
        <div onClick={() => props.setModal()}>Cancell</div>
      </Settings>
    </div>
  );
}
