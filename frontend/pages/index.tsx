import { Sidebar } from "@/components/Sidebar";
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
