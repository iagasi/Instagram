import { log } from 'console'
import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
function Loading() {
  console.log("loadin");
  
  return (
    <div className='loading '><AiOutlineLoading3Quarters/></div>
  )
}

export default Loading
