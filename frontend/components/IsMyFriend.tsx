import { UserAndPrefferncesType, UserType } from '@/../types/userType'
import React from 'react'
 type propsType={
    loggedPerson:UserAndPrefferncesType
    candidate:UserType
 }
function IsMyFriend(props:propsType) {
   
  return (<div className=' text-white  font-bold' >

{props.loggedPerson.prefferences.followings.includes(props.candidate._id)
?<button className=' text-gray-400' disabled>You subscribed</button>:<button className=' bg-blue-500  hover:bg-blue-600 p-2 rounded-md'>Subccribe</button>}

  </div>)}

export default IsMyFriend