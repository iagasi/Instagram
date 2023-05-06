import { WithModal } from "@/Hoc/WithModal";
import React from "react";
type propsType={
   setModal: ()=>void;
  }
export function Settings({setModal}:propsType) {
  return (
    <div  className=" " onClick={(e)=>e.stopPropagation() }>

      <div className=" border-t-2  hover:text-red-700 border-b-2  p-4 text-center cursor-pointer" onClick={()=>setModal()}> Cancel</div>
      <div className=" border-b-2  hover:bg-red-300   p-4 text-center cursor-pointer" onClick={()=>setModal()}> Log Out</div>

  
    </div>
  );
}

