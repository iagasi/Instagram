import { UserAndPrefferncesType } from '@/../types/userType'
import React from 'react'
import ProfileParameters from '../ProfileParameters'

type propsType={
currLoggedUser:UserAndPrefferncesType|null
thisUser:UserAndPrefferncesType|null
}
 export function OtherPersonProfile({currLoggedUser, thisUser}:propsType) {
 
const isMyFriend=currLoggedUser?.prefferences.followings.includes(thisUser?.user?._id!)
  return (
    <div className=' space-x-3'>

{
  isMyFriend?
  <button className='primaryBtn '>Subscriptions</button>:
  <button className=' primaryBtn add-to-friends-btn'>Subscribe</button>
}
<button className='primaryBtn '>Send Message</button>

<button className='primaryBtn '>Send Message</button>

<ProfileParameters/>
    </div>
  )
}

