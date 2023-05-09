import Image from "next/image";
import Header, { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/Card";
import { gql, useQuery } from "@apollo/client";
import { log } from "console";
import { userVar } from "@/reactive/user";
import { Main } from "@/components/Main";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  return (
    <ClientOnly>
      <div className=" flex  ">
        <Sidebar/>
        <Main />
      </div>
    </ClientOnly>
  );
}
