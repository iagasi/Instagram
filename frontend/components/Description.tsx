import React from "react";

function Description() {
  return (
    <div className=" max-sm:hidden">
      <div className="  h-full pt-5 text-center text-sm">
        <h1 className=" text-lg font-bold">About: Instagramm clone</h1>
        <hr className="  border-gray-200"></hr>
        <div className=" border rounded-lg p-3">
          <strong>Messenger</strong>
          <h2 className="  text-left font-medium pt-4">
            Realtime Messaging & Video Calls
          </h2>
        </div>
        <div className=" border rounded-lg p-3">
          <strong>Main App</strong>
          <ul className="  text-left font-medium pt-4">
            <li>
              1: Subscribe and Unsubscribe To peoples{" "}
              <small>(to see their activity)</small>
            </li>
            <li>2: Create & Delete your posts</li>
            <li>3: Comment other peoples posts</li>
            <li>4: Like Unlike other peoples posts</li>

            <h2>5: Modify profile: Name,Surname,ProfileImage</h2>
            <h2>6: SearchBar search Peoples</h2>
            <h2>7: Is Person online realtime</h2>
          </ul>
        </div>

        <div className=" border rounded-lg p-3">
          <strong>How use</strong>
          <h2 className="  text-left font-medium pt-4">Login: user1</h2>

          <h2 className="  text-left font-medium pt-4">
            Login: user2{" "}
            <small>(open Incognito Tab or use other Browser or PC)</small>
          </h2>
        
        </div>

        <div className=" border rounded-lg p-3">
          <strong>Detailed information </strong>
          <h2 className="  text-left font-medium pt-4">
            <a
              className=" hover:text-slate-400"
              href="https://github.com/iagasi/Instagram"
            >
              {" "}
              GITHUB:link
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Description;
