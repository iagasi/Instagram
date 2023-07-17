import ClientOnly from "@/components/ClientOnly";
import { Sidebar } from "@/components/Sidebar";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { postType } from "../../types/postType";
import { useLogginedUserdata } from "@/hooks/user";
import { postImage } from "@/helpers/image";
import { WithPost } from "@/Hoc/InterestingPost";
const GetInterestingPostsGQL= gql`
query GetInterestingPosts($getInterestingPostsId: String) {
  getInterestingPosts(id: $getInterestingPostsId) {
    _id
    userId
    image
    likes
    comments
  }
}`

function explore() {
  return (
    <ClientOnly>
      <div className="flex  gap-2 justify-beetwen
      max-[500px]:flex-col
      ">
        <Sidebar />
   <Exolore/>
      </div>
    </ClientOnly>
  );
}

function ExploreItem({post}:{post:postType}){
  return <div  
  className={` relative bg-gray-500  h-0 pb-[100%] cursor-pointer  `}>
    <Image
    // 
      //  className=" h-[200px] w-[200px] bg-slate-600 relative"

      layout="fill"
      objectFit="cover"
      src={
       postImage( post.image)
      }
      alt="random images"

    />
  </div>
}
const WithExplore=WithPost(ExploreItem)
function Exolore(){
  const{data:loggedUser}=useLogginedUserdata()
const {data}=useQuery(GetInterestingPostsGQL,{variables:{id:loggedUser?.user._id}})
const posts:postType[]|undefined=data?.getInterestingPosts
console.log(data);

return(
  <div className=" overflow-scroll grid grid-cols-3 gap-2 w-full justify-center">
      
  {posts?.map((e, i) => (
<WithExplore key={e._id} post={e}/>

  )
)}
</div>
)
}
export default explore;
