import Image from "next/image";
import Header from "@/components/Header";
import { Card } from "@/components/Card";


export default function Home() {
  return (
    <div>
      <Header />
      <main className=" flex justify-center">
        <Card />
      </main>
    </div>
  );
}
