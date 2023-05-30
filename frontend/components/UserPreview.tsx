import { UserType } from "@/../types/userType";
import { profileImage } from "@/helpers/image";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type propsType = {
  user: UserType|undefined|null ;
  dissabled?:boolean
};
function UserPreview({ user ,dissabled }: propsType) {
  const router=useRouter()
  function routeHandler(){
   !dissabled&& router.push(`/profile/${user?._id}`)
  }
  return (
    <div className=" flex space-x-5 p-4  cursor-pointer h-fit  "
  onClick={routeHandler}
   
    >
      <Image
        className=" rounded-full self-center"
        src={profileImage(user?.image)}
        alt="user Image"
        width={38}
        height={38}
        objectFit="cover"
      //  layout="fixed"
      />
      <div>
        <div className=" flex space-x-2 cursor-pointer font-bold">
          <h3 className=" text-md">{user?.name}</h3>
          <h3 className=" text-md">{user?.surname}</h3>
        </div>
        {/* <p className=" text-sm">abu-dhabi-united-arab-emirates</p> */}
      </div>
    </div>
  );
}

export default UserPreview;
