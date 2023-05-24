import { useDebounder } from "@/hooks/debouncer";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { log } from "console";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Loading from "./Loading";
import { UserType } from "@/../types/userType";
import UserPreview from "./UserPreview";
import { useRouter } from "next/router";
import Image from "next/image";

const wrapperId = "searchWrapper";
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
type propsType = {
  close: () => void;
};
export function Search({ close }: propsType) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchValue = useDebounder(searchText, 800);
  const router = useRouter();

  const { loading, data, refetch } = useQuery(query, {
    variables: { name: searchValue },
    skip: !searchValue,
  });
  const users = data?.findByNameSurname as UserType[] | [];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function wrapperHandler(e: React.SyntheticEvent) {
    const target = e.target as HTMLDivElement;
    if (target.id == wrapperId) {
      close();
    }
  }

  return (
    <>
      <div className="  absolute z-20    text-2xl">
        <div
          id={wrapperId}
          className="   w-screen h-screen absolute top-0  "
          onClick={(e) => {
            wrapperHandler(e);
          }}
        ></div>
        <div className=" search-panel  border-1 border-[1px] rounded-md  border-gray-300 p-5 absolute  top-0 w-72 bg-white h-screen   ">
          <div className="  space-y-7 pb-5 border-b-[1px] border-gray-400">
            <h1 className="  text-center"> Search People</h1>
            <div className=" flex  bg-slate-100 pl-2 pr-2 items-center">
              <input
                ref={inputRef}
                className=" w-full outline-none bg-inherit text-lg p-1 rounded-lg"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              {searchText && (
                <IoMdCloseCircleOutline
                  className=" cursor-pointer"
                  onClick={() => setSearchText("")}
                />
              )}
            </div>
          </div>
          {loading && (
            <div className=" flex justify-center items-center h-2/5">
              <Loading size="20" />
            </div>
          )}
          <div className=" pt-10 space-y-5">
            {users && !users.length && (
              
              <div className=" flex  flex-col justify-center items-center">
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
            {users &&
              users.map((user, i) => (
                <div
                  className=" cursor-pointer hover:bg-gray-300 rounded-md text-lg"
                  key={user._id}
                  onClick={() => {
                    router.push(`/profile/${user._id}`);
                    close();
                  }}
                >
                  <UserPreview user={user} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
