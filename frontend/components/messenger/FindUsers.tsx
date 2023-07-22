import { UserType } from "@/../types/userType";
import { useDebounder } from "@/hooks/debouncer";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import UserPreview from "../UserPreview";
import { BiMessageAdd } from "react-icons/bi";
import CreateChat from "./CreateChat";
import Loading from "../Loading";
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
  const searchRef = useRef(null);
  const { loading, data, refetch } = useQuery(query, {
    variables: { name: searchValue },
    skip: !searchValue,
  });
  const users = data?.findByNameSurname as UserType[] | [];
  const close = function () {
    setSearchText("");
  };

  return (
    <div ref={searchRef} className=" relative">
      <div className=" flex  bg-slate-100 pl-2 pr-2 items-center">
        <input
          //   ref={inputRef}
          className=" w-full outline-none bg-inherit text-lg p-1 rounded-lg"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {loading && <Loading />}

        {searchText && (
          <IoMdCloseCircleOutline
            className=" cursor-pointer text-2xl text-red-600"
            onClick={() => setSearchText("")}
          />
        )}
      </div>
      {users && (
        <div className=" bg-white  max-w-500px h-screen   rounded-lg  shadow-lg z-30 p-2  max-[970px]:text-sm ">
          <div className=" ">
            {!users.length && (
              <div className=" flex  flex-col justify-center items-center  border-b-2 ">
                <h2 className=" font-bold pb-5">User not found!!</h2>

                <Image
                  className=" rounded-full h-[150px] w-[150px] "
                  src={"/users-not-foung.png"}
                  height={150}
                  width={150}
                  objectFit="cover"
                  alt="Profile image"
                />
              </div>
            )}
            {users && (
              <>
                <div className="">
                  {users.length !== 0 && (
                    <h3 className="text-black  text-lg self-center pt-5 font-bold text-center border-b-2 pb-2">
                      Found Users
                    </h3>
                  )}
                  {users.map((user, i) => (
                    <div className=" sidebar-elem  pr-3 " key={user._id}>
                      <CreateChat user={user} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div
            className=" fixed h-screen w-screen top-0 left-0   z-20"
            onClick={(e) => close()}
          ></div>
        </div>
      )}
    </div>
  );
}

export default FindUsers;
