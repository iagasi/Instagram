import Image from 'next/image'
import React from 'react'

function UserPreview() {
  return (
    <div className=" flex space-x-5 pb-5">
    <Image
      className=" rounded-full w-12 h-12"
      src={"/test.jpg"}
      alt="user Image"
      width={50}
      height={50}
    />
    <div>
      <h3 className=" text-xl"> Name of user</h3>
      <p>abu-dhabi-united-arab-emirates</p>
    </div>
  </div>
  )
}

export default UserPreview