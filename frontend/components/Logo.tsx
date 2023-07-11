import Image from 'next/image'
import React, { useEffect } from 'react'

function Logo() {
  useEffect(()=>{

  })
  return (
    <div className=" flex  flex-col   justify-center items-center  w-full  h-screen   ">
      <div className=' p-10 text-2xl font-bold'>Instagram</div>
          <div   className='logo-animation  '>
  <Image
            
              src="/small-logo.png"
              alt="logo"
              width={100}
              height={100}
            />

          </div>
        
          
          </div>
  )
}

export default Logo