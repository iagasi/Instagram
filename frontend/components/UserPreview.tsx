import { UserType } from "@/../types/userType";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type propsType = {
  user: UserType|undefined|null ;
};
function UserPreview({ user }: propsType) {
  const router=useRouter()
  return (
    <div className=" flex space-x-5 p-1  cursor-pointer  "
    onClick={()=>router.push(`/profile/${user?._id}`)}
    >
      <Image
        className=" rounded-full w-12 h-12 self-center"
        src={user?.image || "/test.jpg"}
        alt="user Image"
        width={50}
        height={50}
        
      />
      <div>
        <div className=" flex space-x-2 cursor-pointer">
          <h3 className=" text-xl">{user?.name}</h3>
          <h3 className=" text-xl">{user?.surname}</h3>
        </div>
        {/* <p className=" text-sm">abu-dhabi-united-arab-emirates</p> */}
      </div>
    </div>
  );
}

export default UserPreview;
