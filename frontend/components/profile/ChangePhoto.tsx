import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import { Settings } from "./Settings";
import { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { PROFILE_IMAGE_UPLOAD } from "@/helpers/constants";
import { log } from "console";
import { UserType } from "@/../types/userType";
import { useLogginedUserdata } from "@/hooks/user";
import Loading from "../Loading";
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
 const [uploading,setUploading]=useState(false)

  async function uploadHadler(e: any) {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const selectedFile = e.target?.files && e.target?.files[0];
    if (!selectedFile || !url) {
      return;
    }
    const formData = new FormData();
    formData.append("File", selectedFile);
setUploading(true)

    await axios.put(PROFILE_IMAGE_UPLOAD + "/" + props.user._id, formData);
   
    setUploading(false)
    refetch();
    props.setModal()
   
  }
// useEffect(()=>{
//   if(logginedUser){
//     setUploading(false)
//     "refetching"
//   }
// },[logginedUser])
  async function deletePhoto(){
    setUploading(true)
    await axios.delete(PROFILE_IMAGE_UPLOAD + "/" + props.user._id,);

    setUploading(false)
    setDel(!del)
    refetch();
    props.setModal()
  }
  return (
    <div className="  space-y-5 w-[300px]">
    {uploading&& <div className=" w-full flex justify-center"><Loading size="40"/></div>}

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
            {uploading&& <div className=" w-full flex justify-center"><Loading size="40"/></div>}
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
