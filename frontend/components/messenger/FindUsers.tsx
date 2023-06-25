import { UserType } from "@/../types/userType";
import { useDebounder } from "@/hooks/debouncer";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import UserPreview from "../UserPreview";
import { BiMessageAdd } from "react-icons/bi";
import CreateChat from "./CreateChat";
const query = gql`
  query ($name: String) {
    findByNameSurname(name: $name) {
      _id
      name
      surname
      image
    }
  }
`;

function FindUsers() {
  const [searchText, setSearchText] = useState("");
  const searchValue = useDebounder(searchText, 800);
const searchRef=useRef(null)
  const { loading, data, refetch } = useQuery(query, {
    variables: { name: searchValue },
    skip: !searchValue,
  });
  const users = data?.findByNameSurname as UserType[] | [];
   const close=function (e:MouseEvent){

    const target=e.target as HTMLDivElement

    
  }
  useEffect(()=>{
document.body.addEventListener("click",close)
return()=>{
  document.body.removeEventListener("click",close)

}
  },[])
  return (
    <div  ref={searchRef} className=" relative" onBlur={()=>{console.log("click outside")}}>
      <div className=" flex  bg-slate-100 pl-2 pr-2 items-center">
        <input
          //   ref={inputRef}
          className=" w-full outline-none bg-inherit text-lg p-1 rounded-lg"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {searchText && (
          <IoMdCloseCircleOutline
            className=" cursor-pointer text-2xl text-red-600"
            onClick={() => setSearchText("")}
          />
        )}
      </div>
      {users && (
        <div className=" absolute bg-slate-300 w-full h-screen  z-50 ">
          {!users.length && (
            <div className=" flex  flex-col justify-center items-center ">
              <Image
                className=" rounded-full h-[150px] w-[150px] "
                src={"/users-not-foung.png"}
                height={150}
                width={150}
                objectFit="cover"
                alt="Profile image"
              />
              <h2>User not found!!</h2>
            </div>
          )}
          {users && (
            <div>
              {users.map((user, i) => (
                <div
                  className=" cursor-pointer hover:bg-gray-300 rounded-md text-lg "
                  key={user._id}
                >
                  <CreateChat user={user}  />
                </div>
              ))}
              {users.length !== 0 && (
                <h3 className="text-black  text-lg self-center pt-5">
                  Found Users
                </h3>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FindUsers;
