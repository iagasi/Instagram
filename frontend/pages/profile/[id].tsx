import ClientOnly from "@/components/ClientOnly";
import { Sidebar } from "@/components/Sidebar";
import Profile from "@/components/profile/Profile";

import Image from "next/image";
import React from "react";

function profile() {
  return (
    <div className="flex ">
      <Sidebar />
      <ClientOnly>
        <Profile />
      </ClientOnly>
    </div>
  );
}

export default profile;
