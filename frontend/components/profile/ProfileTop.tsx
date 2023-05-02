import Image from 'next/image'
import React from 'react'

 export function ProfileTop() {
  return (
    <div className=" flex mx-auto space-x-20 pb-8 pt-8 pl-20">
    <Image
      className=" rounded-full h-[150px] w-[150px]"
      src={"/test.jpg"}
      height={150}
      width={150}
      alt="profile image"
    />
    <div className=" space-y-5">
      <div className=" justify-between flex content-center">
        <p className=" self-center">User Id </p>
        <button className=" bg-gray-400 p-2 rounded-lg"> Edit pofile</button>
      </div>
      <div className="  flex space-x-5">
        <p> 0 posts</p>
        <p> 7 folowers</p>
        <p> 1 following</p>
      </div>
      <h3 className=" font-bold"> User Name</h3>
    </div>
  </div>
  )
}

