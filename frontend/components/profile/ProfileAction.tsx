import React, { useState } from "react";

export function ProfileActions() {
    const [ checked,setChecked]=useState<null|number>(null)
  return (
    <div className="  flex justify-center ">
        <div className="">
           <div className=" h-[1px] w-screen bg-gray-200"> </div>
      <div className=" flex mx-auto w-fit space-x-20  ">
        <p className={` cursor-pointer p-2  border-black ${checked==0&& 'border-t-2'}`} onClick={()=>setChecked(0)}> Posts </p>
        <p  className={` cursor-pointer p-2  border-black ${checked==1&& 'border-t-2'}`} onClick={()=>setChecked(1)}> Saved </p>
        <p  className={` cursor-pointer p-2  border-black ${checked==2&& 'border-t-2'}`} onClick={()=>setChecked(2)}> Tagged </p>
      </div>  
        </div>
       
    </div>
  );
}

