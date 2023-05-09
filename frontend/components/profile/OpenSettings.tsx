import { WithModal } from "@/Hoc/WithModal";
import React from "react";
import { Settings } from "./Settings";
import { SlSettings } from "react-icons/sl";
import { withModalType } from "@/types/modalTypes";


function OpenSettings({ modal, setModal }: withModalType) {
  return (
    <div className="">
      <SlSettings className=" w-8 h-8 cursor-pointer" onClick={() => setModal()} />
    </div>
  );
}
function OpenedSettings( {setModal}: {setModal: ()=>void}){
return <>

 <Settings>

<div className=" text-red-500"  onClick={()=>setModal()}> Cancel</div>
<div onClick={()=>setModal()}> Log Out</div>
  </Settings>
</>
 
}
export default WithModal(OpenSettings, OpenedSettings);
