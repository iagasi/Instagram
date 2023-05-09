import ClientOnly from "@/components/ClientOnly";
import  { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import React from "react";

const images = new Array(50).fill("5");
console.log(images);

function explore() {
  return (
    <div className="flex flex-wrap  gap-2 justify-center">
      <ClientOnly>
        <Sidebar />
        {images.map((e, i) => (
          <Image
            className=" h-[315px] w-[315px] bg-slate-600"
            key={i}
            src={""}
            width={150}
            height={200}
            alt="random images"
          />
        ))}
      </ClientOnly>
    </div>
  );
}

export default explore;
