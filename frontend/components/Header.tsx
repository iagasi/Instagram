import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AiFillCompass } from "react-icons/ai";
import { AiOutlineHeart,AiOutlinePlusCircle } from "react-icons/ai";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

function Header() {
  return (
    <header className=" flex justify-between border-b-2  text-3xl  p-5 bg-slate-100">
      <nav className=" flex space-x-4 bg-slate-100 w-fit  ">
        <AiFillHome className=" cursor-pointer" />
        <BsSearch />
        <AiFillCompass />
        <AiOutlineHeart />
        <AiOutlinePlusCircle/>
        <RxAvatar/>
      </nav>
      <RxHamburgerMenu  />
    </header>
  );
}

export default Header;
