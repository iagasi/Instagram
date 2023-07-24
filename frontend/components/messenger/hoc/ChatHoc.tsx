import React, { useEffect, useRef, useState } from "react";
import { log } from "util";
type propsType = {
  MainComponent: () => JSX.Element;
};
function ChatHoc(props: propsType) {
  const [switcher, setSwitcher] = useState(false);
  const [main, setMain] = useState(true);

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize < 1100) {
      if (!switcher) {
        setMain(false);
      }
      setSwitcher(true);
    } else {
      setSwitcher(false);
      setMain(true);
    }
  }, [windowSize]);

  return (
    <div className="h-full relative ">
      {switcher && (
             <div className=" cursor-pointer   mt-20 font-bold  bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full w-14 h-14 flex items-center justify-center"
             onClick={() => setMain(!main)}>
                  {main?"Back<":"Chats"}
                </div>
      )}
      {main && (
        <div
          className={
            windowSize < 1100
              ? " absolute  top-0  left-14 bg-white h-full w-[300px] z-10 border-2"
              : ""
          }
        >
          <props.MainComponent />
        </div>
      )}
    </div>
  );
}

export default ChatHoc;
