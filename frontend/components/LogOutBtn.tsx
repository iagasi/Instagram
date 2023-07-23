import { LStorage } from "@/helpers/user";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function LogOutBtn({ width = "fit" }: { width?: string }) {
  const router = useRouter();
  async function logoutandler() {
    if (SERVER_URL) {
      const res = await axios.get("/api/logout", { withCredentials: true });
      LStorage.setUser({ _id: "", acessToken: "" });
      router.push("/auth");
    }
  }
  return (
    <button className={`  w-full h-full text-center`} onClick={logoutandler}>
      Log-out
    </button>
  );
}
