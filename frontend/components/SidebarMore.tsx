import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export function SidebarMore() {
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <div className=" items-stretch   space-x-2 cursor-pointer relative ">
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
          <div className="absolute bottom-20  bg-white border- p-4  shadow-2xl border-gray-500 rounded-md  h-60  text-xl">
            <div className=" sidebar-elem p-1">Log-out</div>
          </div>
        </div>
      )}
    </div>
  );
}
