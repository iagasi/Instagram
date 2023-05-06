import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AiFillCompass } from "react-icons/ai";
import { AiOutlineHeart, AiOutlinePlusCircle } from "react-icons/ai";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search } from "./Search";


function Header() {
  const router = useRouter();
  const [sbar, setSbar] = useState(false);
  return (
    <div>
      {sbar && (
        <Search
          close={() => {
            setSbar(!sbar);
          }}
        />
      )}

      <header
        className=" relative  z-20 flex flex-col  bg-white space-y-20 border-r-2   text-3xl   p-4 pb-10 w-[250px] h-screen "
      >
        <div className=" w-36 h-10  pt-8 pb-8">
          <Image
            className=" block "
            src="/bglogo.png"
            alt="logo"
            width={200}
            height={60}
          />
        </div>

        <nav className=" flex    flex-col  w-full space-y-8   ">
          <div className=" sidebar-elem  " onClick={() => router.push("/")}>
            <AiFillHome className=" cursor-pointer " />
            <span className=" text-lg">Home</span>
          </div>
          <div onClick={() => setSbar(!sbar)}>
            <div className="sidebar-elem">
              <BsSearch />
              <span className=" text-lg">Search</span>
            </div>
          </div>

          <div className=" sidebar-elem">
            <AiFillCompass />
            <span className=" text-lg">Interesting</span>
          </div>
          <div className="sidebar-elem">
            <AiOutlineHeart />
            <span className=" text-lg">Like</span>
          </div>
          <div className="sidebar-elem">
            <AiOutlinePlusCircle />

            <span className=" text-lg">Create</span>
          </div>
          <div
            className="sidebar-elem"
            onClick={() => router.push("/profile/1")}
          >
            <RxAvatar />

            <span className=" text-lg">Profile</span>
          </div>
        </nav>
        <div className=" flex  items-stretch">
          <RxHamburgerMenu />
          <span className=" text-lg">More</span>
        </div>
      </header>
    </div>
  );
}

export default Header;
