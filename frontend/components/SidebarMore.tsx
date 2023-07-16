import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import LogOutBtn from "./LogOutBtn";

export function SidebarMore() {
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <div
      className=" items-stretch   space-x-2 cursor-pointer relative  max-[500px]:hidden 
    "
    >
      <div
        className="  flex sidebar-elem items-stretch "
        onClick={() => setMoreOpen(!moreOpen)}
      >
        <RxHamburgerMenu />
        <span className=" text-lg sidebar-descr-hide">More</span>
      </div>

      {moreOpen && (
        <div
          className=" fixed  w-full h-full top-0 left-0"
          onClick={(e) => {
            if (e.currentTarget != e.target) return;

            setMoreOpen(!open);
          }}
        >
          <div className="absolute bottom-20  bg-white border- p-4  shadow-2xl border-gray-700 rounded-md  h-60  text-xl">
            <div className="sidebar-elem bg-slate-300 p-1 text-red-500 text-lg font-bold">
              {" "}
              <LogOutBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
