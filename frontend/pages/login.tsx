import Image from 'next/image'
import React from 'react'

function login() {
  return (
    <div className=' flex justify-center h-screen items-center'>

<div className=' border relative border-zinc-400 w-[300px] p-10 rounded-lg'>


<Image className=' absolute left-0 right-0 top-2 block mx-auto' src="/bglogo.png" alt="logo" width={150} height={60}/>

<input className='w-full border  border-zinc-400  rounded-md mt-9 focus:outline-0 focus:border-green-700' placeholder='Login' type='text' />
<input className='w-full border  border-zinc-400 rounded-md  mt-1 focus:outline-0 focus:border-green-700' placeholder='Password' type='text' />

<button className=' mt-5 text-white text-lg bg-blue-500 p-1 w-full rounded-lg'>Login</button>
<h3 className=' text-center'>OR</h3>
<button className=' bg-gray-200 block mx-auto p-1'>Login with Google</button>


    </div>

    </div>

  )
}

export default login