import ClientOnly from "@/components/ClientOnly";
import Profile from "@/components/profile/Profile";
import React from "react";

function profile() {
  return (
    <div className="">
      <div className=" ">
        <ClientOnly>
          <Profile />
        </ClientOnly>
      </div>
    </div>
  );
}

export default profile;
