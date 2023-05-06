import ClientOnly from "@/components/ClientOnly";
import Header from "@/components/Header";
import  Profile  from "@/components/profile/Profile";

import Image from "next/image";
import React from "react";

function profile() {
  return (
   
    <div className="flex">
<Header/>
         <ClientOnly>
          <Profile/>
            
        
         </ClientOnly>

   
    </div>

  
  );
}

export default profile;
