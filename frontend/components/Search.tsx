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
import { searchBarVar } from "@/reactive/search";

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
type propsType={
    close:()=>void
}
export function Search({close}:propsType) {
    

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
close()    }
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
        <div className="  space-y-7 pb-5 border-b-2 border-gray-400">
          <h1 className="  text-center"> Search</h1>
          <div className=" flex  bg-slate-100 pl-2 pr-2">
            <input
              ref={inputRef}
              className=" w-full outline-none bg-inherit"
              type="text"
              placeholder="search"
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
            <Loading />
          </div>
        )}
        <div className=" pt-10 space-y-5">
          {users &&
            users.map((user, i) => (
              <div
                className=" cursor-pointer hover:bg-gray-300 rounded-md"
                key={user._id}
                onClick={() => {
                  router.push(`/profile/${user._id}`);
                  close()
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


