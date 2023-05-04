import { WithModal } from "@/Hoc/WithModal";
import React from "react";
type propsType={
   setModal: ()=>void;
  }
export function Settings({setModal}:propsType) {
  return (
    <div  className=" bg-slate-500" onClick={(e)=>e.stopPropagation() }>
      <div className="  border-t-2 p-4 text-center"> Sites</div>
      <div className="  border-t-2 p-4 text-center"> wccs</div>
      <div className=" border-t-2  p-4 text-center"> Notifications</div>
      <div className=" border-b-2  p-4 text-center" onClick={()=>setModal()}> Cancel</div>
    </div>
  );
}

