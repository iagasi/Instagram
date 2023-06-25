import { WithModal } from "@/Hoc/WithModal";
import { log } from "console";
import React, { useEffect, useRef } from "react";
type propsType = {
  children: React.ReactNode;
};
export function Settings({ children }: propsType) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (r.current) {
      const elem = r.current as HTMLElement;
      Array.from(elem.children).forEach((e) => {
        e.classList.add("setting__item");
      });
    }
  }, []);

  return (
    <div ref={r} className=" " onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}
