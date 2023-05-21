import { UserAndPrefferncesType } from '@/../types/userType'
import React from 'react'
import ProfileParameters from '../ProfileParameters'
import SubscribeBthHandler from '@/components/SubscribeBthHandler'
import { useReactiveVar } from '@apollo/client'
import { userVar } from '@/reactive/user'
import UnsubscribeBtnHandler from '@/components/UnsubscribeBtnHandler'
import { DeleteOrAddToFriends } from '@/components/DeleteOrAddToFriends'

type propsType={
profileOwner:UserAndPrefferncesType
}
 export function OtherPersonProfile({ profileOwner}:propsType) {
 const loggedUser=useReactiveVar(userVar)
const isMyFriend=loggedUser?.prefferences.followings.includes(profileOwner?.user?._id!)
  return (
    <div className=' space-x-3'>

{
  isMyFriend?
 <UnsubscribeBtnHandler deletingFriendId={profileOwner.user._id} deletingUser={profileOwner.user} buttonName='Unsubscribe'/>:
 <SubscribeBthHandler candidate={profileOwner.user}/>
//  <DeleteOrAddToFriends loggedUser={profileOwner.user} friends={} />
}
<button className='primaryBtn '>Send Message</button>

<button className='primaryBtn '>Send Message</button>

<ProfileParameters/>
    </div>
  )
}

