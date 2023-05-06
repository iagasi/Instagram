import React, { useState } from "react";
import SahrePosts from "./SharePosts";
import { UserAndPrefferncesType } from "@/../types/userType";

export function ProfileActions({data}:{data:UserAndPrefferncesType}) {
    const [ checked,setChecked]=useState<null|number>(0)
  return (
    <div className="   ">
        <div className="">
           <div className=" h-[1px] w-screen bg-gray-200"> </div>
      <div className=" flex mx-auto w-fit space-x-20  ">
        <p className={` cursor-pointer p-2  border-black ${checked==0&& 'border-t-2'}`} onClick={()=>setChecked(0)}> Posts </p>
        <p  className={` cursor-pointer p-2  border-black ${checked==1&& 'border-t-2'}`} onClick={()=>setChecked(1)}> Saved </p>
        <p  className={` cursor-pointer p-2  border-black ${checked==2&& 'border-t-2'}`} onClick={()=>setChecked(2)}> Tagged </p>
      </div>  

        </div>
        <div className=" pt-10 grid grid-cols-3 gap-1 w-fit m-auto">
           {
        data&&  data.prefferences.posts.map((post)=>
          
          <div  className=" bg-slate-500 h-52 w-52" key={post}>

          </div>
          )
        }
        </div>
              <SahrePosts/>

    </div>
  );
}

