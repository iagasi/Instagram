import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Card } from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

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
