import { log } from 'console'
import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
function Loading({size ="10"}:{size:string|undefined}) {

  const sizeFont=`text-[${size}px]`
  return (
    <div className='loading  '>
      <AiOutlineLoading3Quarters  className={sizeFont} />
      </div>
  )
}

export default Loading
