import React, { useState } from "react";
import { AiOutlineHome, AiOutlineCompass } from "react-icons/ai";
import { BsMessenger, BsSearch } from "react-icons/bs";
import { AiOutlineHeart, AiOutlinePlusCircle } from "react-icons/ai";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search } from "./Search";
import { log } from "console";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/reactive/user";
import Loading from "./Loading";
import { profileImage } from "@/helpers/image";
import { useLogginedUserdata } from "@/hooks/user";
import SidebarCreate from "./SidebarCreate";
import MessengerOpenBtn from "./messenger/MessengerOpenBtn";
import { SidebarMore } from "./SidebarMore";

export function Sidebar() {
  const router = useRouter();
  const [searchBar, setSearchbar] = useState(false);
  const [create, setCreate] = useState(false);
  const { data: currLoggedUser } = useLogginedUserdata();

  if (!currLoggedUser) {
    return (
      <div>
        <Loading size="40" />{" "}
      </div>
    );
  }
  return (
    <div className="   max-[500px]:h-[80px]">
      {searchBar && (
        <Search
          close={() => {
            setSearchbar(!searchBar);
          }}
        />
      )}

      <header
        className=" sticky top-0 bottom-4 z-20 flex flex-col  bg-white space-y-20 border-r-2  pl-0 text-3xl  
      pb-10 w-[250px]
      h-screen
      border-t-2
       
      max-xl:w-[180px]
      max-lg:w-[70px] 
      max-lg:pl-0

      max-[500px]:space-y-0
      max-[500px]:flex-row 
      max-[500px]:h-[50px]
      max-[500px]:w-full
      max-[500px]: items-center
      max-[500px]: pt-2
      max-[500px]:justify-start
      "
      >
        <div
          className="  h-10  pt-8 pb-8 cursor-pointer "
          onClick={() => router.push("/")}
        >
          <div className=" max-lg:hidden ">
            <Image
              className=" block "
              src="/bglogo.png"
              alt="logo"
              width={200}
              height={60}
            />
          </div>
          <div className=" hidden max-lg:flex    max-[500px]:hidden justify-center   ">
            <Image
              className=" block "
              src="/small-logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div
          className=" h-full flex flex-col justify-between
              max-[500px]:flex-row  
              max-[500px]:flex-1
              max-[500px]:space-x-2

        "
        >
          <nav
            className=" flex    flex-col  w-full space-y-8  h-full border-b-2
           max-[500px]:gap-2
           max-[500px]:space-y-0
           max-[500px]:flex-row
           max-[500px]:h-[40px]
           max-[500px]:justify-between

          "
          >
            <div
              className="relative sidebar-elem  "
              onClick={() => router.push("/")}
            >
              <AiOutlineHome className=" cursor-pointer " />
              <span className=" text-lg  sidebar-descr-hide ">Home</span>
              {router.pathname == "/" && (
                <div className="sidebar__active"></div>
              )}
            </div>
            <div onClick={() => setSearchbar(!searchBar)}>
              <div className="sidebar-elem">
                <BsSearch />
                <span className=" text-lg  sidebar-descr-hide">Search</span>
              </div>
            </div>

            <div
              className="relative sidebar-elem"
              onClick={() => router.push("/explore")}
            >
              <AiOutlineCompass />
              <span className=" text-lg sidebar-descr-hide">Interesting</span>
              {router.pathname == "/explore" && (
                <div className="sidebar__active"></div>
              )}
            </div>
            <div className="sidebar-elem" onClick={() => router.push("/like")}>
              <AiOutlineHeart />
              <span className=" text-lg sidebar-descr-hide">Like</span>
              {router.pathname == "/like" && (
                <div className="sidebar__active"></div>
              )}
            </div>
            <SidebarCreate />
            <MessengerOpenBtn />

            <div
              className="relative  sidebar-elem"
              onClick={() => router.push("/profile/" + currLoggedUser.user._id)}
            >
              <Image
                className=" rounded-full h-[40px] w-[40px]"
                src={profileImage(currLoggedUser?.user?.image)}
                height={35}
                width={35}
                objectFit="cover"
                alt="Profile image"
                layout="fixed"
              />

              <span className="  text-lg sidebar-descr-hide">
                <strong>{currLoggedUser?.user?.name}</strong>
              </span>
              {router.pathname.split("/").includes("profile") && (
                <div className="sidebar__active"></div>
              )}
            </div>
          </nav>
          <SidebarMore />
        </div>
      </header>
    </div>
  );
}
