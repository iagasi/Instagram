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
    <div className="">
      {searchBar && (
        <Search
          close={() => {
            setSearchbar(!searchBar);
          }}
        />
      )}

      <header className=" sticky top-0 z-20 flex flex-col  bg-white space-y-20 border-r-2   text-3xl  pl-4  max-[850px]:pl-0 pb-10 w-[250px] h-screen max-xl:w-[180px] max-[850px]:w-[70px]  ">
        <div
          className=" w-36 h-10  pt-8 pb-8 cursor-pointer "
          onClick={() => router.push("/")}
        >
          <div className=" max-[850px]:hidden">
            <Image
              className=" block "
              src="/bglogo.png"
              alt="logo"
              width={200}
              height={60}
            />
          </div>
          <div className=" hidden max-[850px]:flex justify-center  w-[70px] ">
            <Image
              className=" block "
              src="/small-logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className=" h-full flex flex-col justify-between">
          <nav className=" flex    flex-col  w-full space-y-8   ">
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
              />

              <span className="  text-lg sidebar-descr-hide">
                <strong>{currLoggedUser?.user?.name}</strong>
              </span>
              {router.pathname.split("/").includes("profile") && (
                <div className="sidebar__active"></div>
              )}
            </div>
          </nav>
       <SidebarMore/>
        </div>
      </header>
    </div>
  );
}
