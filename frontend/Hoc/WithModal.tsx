import { Modal } from "@/components/Modal";
import { withModalType } from "@/types/modalTypes";
import React, { useState } from "react";

type propsType = {
  BaseComponent: (props: withModalType) => JSX.Element;
  ModalInnerData:(setModal:()=>void)=>JSX.Element
  
};

export function WithModal( BaseComponent:propsType["BaseComponent"], ModalInnerData:(setModal: Pick<withModalType,"setModal">)=>JSX.Element) {
  return function Fn() {
    const [isOpen, SetIsOpen] = useState(false);

    return (
      <>
      <BaseComponent modal={isOpen} setModal={()=>{SetIsOpen(!isOpen)}}/>
        {isOpen && (
          <Modal
            modal={isOpen}
            setModal={() => SetIsOpen(!isOpen)}
            Data={ ModalInnerData}
          />
        )}
      </>
    );
  };
}
