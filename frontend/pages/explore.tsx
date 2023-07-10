import ClientOnly from "@/components/ClientOnly";
import { Sidebar } from "@/components/Sidebar";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { postType } from "../../types/postType";
import { useLogginedUserdata } from "@/hooks/user";
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

const imagoes= new Array(13).fill("50")
function explore() {
  return (
    <ClientOnly>
      <div className="flex  gap-2 justify-beetwen">
        <Sidebar />
   <Exolore/>
      </div>
    </ClientOnly>
  );
}
function Exolore(){
  const{data:loggedUser}=useLogginedUserdata()
const {data}=useQuery(GetInterestingPostsGQL,{variables:{id:loggedUser?.user._id}})
const posts:postType[]|undefined=data?.getInterestingPosts
console.log(data);

return(
  <div className=" overflow-scroll flex flex-wrap gap-2 w-full justify-center">
      
  {posts?.map((e, i) => (

   <div key={i} 
    className={` w-[30%]  relative bg-gray-500 ${(i+1)%3==0?"height-big":"heigh-small"} `}>
      <Image
      // 
        //  className=" h-[200px] w-[200px] bg-slate-600 relative"

        layout="fill"
        objectFit="cover"
        src={
          "http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A4000%2Fimages%2Fdd1fb4bf-1a00-441f-ad50-17c5a99f33b2image-2023-02-28%2019_11_25.jpg&w=640&q=75"
        }
        alt="random images"
        // width={0}
        // height={0}
        // sizes="100vw"
        // style={{ width: "100%", height: "auto" }}
      />
    </div>
  )
)}
</div>
)
}
export default explore;
