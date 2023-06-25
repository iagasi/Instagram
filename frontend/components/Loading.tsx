import { log } from 'console'
import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
function Loading({size}:{size?:string|undefined}) {

  const sizeFont=`text-[${size}px]`  
  return (
    <div className='loading  '>
      <AiOutlineLoading3Quarters 
       className={sizeFont}
      // className='text-[30px]'
      
       />
      </div>
  )
}

export default Loading
