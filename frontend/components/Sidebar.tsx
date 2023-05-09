import React, { useState } from "react";
import { AiOutlineHome, AiOutlineCompass } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart, AiOutlinePlusCircle } from "react-icons/ai";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search } from "./Search";
import { log } from "console";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/reactive/user";

export function Sidebar() {
  const router = useRouter();
  const [searchBar, setSearchbar] = useState(false);
  console.log(router.pathname.split("/").includes("profile"));

  const currLoggedUser = useReactiveVar(userVar);
  return (
    <div>
      {searchBar && (
        <Search
          close={() => {
            setSearchbar(!searchBar);
          }}
        />
      )}

      <header className=" sticky top-0 z-20 flex flex-col  bg-white space-y-20 border-r-2   text-3xl   p-4 pb-10 w-[250px] h-screen ">
        <div
          className=" w-36 h-10  pt-8 pb-8 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            className=" block "
            src="/bglogo.png"
            alt="logo"
            width={200}
            height={60}
          />
        </div>

        <nav className=" flex    flex-col  w-full space-y-8   ">
          <div
            className="relative sidebar-elem  "
            onClick={() => router.push("/")}
          >
            <AiOutlineHome className=" cursor-pointer " />
            <span className=" text-lg">Home</span>
            {router.pathname == "/" && <div className="sidebar__active"></div>}
          </div>
          <div onClick={() => setSearchbar(!searchBar)}>
            <div className="sidebar-elem">
              <BsSearch />
              <span className=" text-lg">Search</span>
            </div>
          </div>

          <div
            className="relative sidebar-elem"
            onClick={() => router.push("/explore")}
          >
            <AiOutlineCompass />
            <span className=" text-lg">Interesting</span>
            {router.pathname == "/explore" && (
              <div className="sidebar__active"></div>
            )}
          </div>
          <div className="sidebar-elem" onClick={() => router.push("/like")}>
            <AiOutlineHeart />
            <span className=" text-lg">Like</span>
            {router.pathname == "/like" && (
              <div className="sidebar__active"></div>
            )}
          </div>
          <div className="sidebar-elem">
            <AiOutlinePlusCircle />

            <span className=" text-lg">Create</span>
          </div>
          <div
            className="relative  sidebar-elem"
            onClick={() => router.push("/profile/1")}
          >
            <RxAvatar />

            <span className="  text-lg">
              <strong>{currLoggedUser?.user?.name}</strong>
            </span>
            {router.pathname.split("/").includes("profile") && (
              <div className="sidebar__active"></div>
            )}
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
