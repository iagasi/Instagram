import ClientOnly from "@/components/ClientOnly";
import  Profile  from "@/components/profile/Profile";

import Image from "next/image";
import React from "react";

function profile() {
  return (
   
    <div>

         <ClientOnly>
          <Profile/>
            
        
         </ClientOnly>

   
    </div>

  
  );
}

export default profile;
