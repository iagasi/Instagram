import { WithModal } from "@/Hoc/WithModal";
import { UPLOAD_POST_IMAGE_URL } from "@/helpers/constants";
import { useLogginedUserdata, useVisitedPageUser } from "@/hooks/user";
import { withModalType } from "@/types/modalTypes";
import axios from "axios";
import React, { useState } from "react";
import { BsCamera } from "react-icons/bs";
import Loading from "../Loading";

function SharePosts(props: withModalType) {
  return (
    <div className="flex justify-center flex-col items-center pt-10">
      <BsCamera
        className="cursor-pointer w-12 h-12"
        onClick={() => props.setModal()}
      />

      <div className=" text-2xl">Share-Posts</div>
    </div>
  );
}
export function SharePostsModalData(props: withModalType) {
  const {data:visitedPageData,refetch:refetchPageData,loading:visLoading}=useVisitedPageUser()

  const [loading, setLoading] = useState(false);
  const { data: user, refetch } = useLogginedUserdata();
  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const selectedFile = e.target?.files && e.target?.files[0];
    if (!selectedFile || !url) {
      return;
    }
    const formData = new FormData();
    formData.append("File", selectedFile);
    setLoading(true);
    try {
      await axios.put(UPLOAD_POST_IMAGE_URL + "/" + user.user._id, formData);
      refetch();
      refetchPageData()
     setLoading(false);
    } finally {
      // props.setModal()
    }
  };
  return (
    <div className=" flex flex-col  items-center justify-center h-full bg-white p-10 rounded-md max-md:p-4   ">
      {loading ? (
        <div className="flex flex-col justify-center ">
          <h1>Uploading...</h1>
          <Loading size="40" />
        </div>
      ) : (
        <div className="  pb-20"> You can Upload images From your PC</div>
      )}

      <label className=" bg-blue-400 hover:bg-blue-500 text-white rounded-md p-2 cursor-pointer">
        {<div>Upload from Pc</div>}

        <input
          className="hidden"
          type="file"
          onChange={(e) => uploadHandler(e)}
        />
      </label>
    </div>
  );
}

export default WithModal(SharePosts, SharePostsModalData);
