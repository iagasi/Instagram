import Auth from "@/components/Auth";
import ClientOnly from "@/components/ClientOnly";
import Image from "next/image";
import React from "react";

function auth() {
  return (
    <ClientOnly>
      <Auth />
    </ClientOnly>
  );
}

export default auth;
