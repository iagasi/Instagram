import { Modal } from "@/components/Modal";
import { withModalType } from "@/types/modalTypes";
import React, { useState } from "react";

type propsType = {
  BaseComponent: (props: withModalType ) => JSX.Element;
  ModalInnerData: (setModal: () => void) => JSX.Element;
};

export function WithModal<BASETYPE,INNERTYPE>(
  BaseComponent:(props: withModalType&BASETYPE ) => JSX.Element ,
  ModalInnerData: (props: INNERTYPE) => JSX.Element
) {
  return function Fn(props: any) {
    const [isOpen, SetIsOpen] = useState(false);

    return (
      <>
        <BaseComponent
          {...props}
          modal={isOpen}
          setModal={() => {
            SetIsOpen(!isOpen);
          }}
        />
        {isOpen && (
          <Modal modal={isOpen} setModal={() => SetIsOpen(!isOpen)}>
            <ModalInnerData
              {...props}
              setModal={() => {
                SetIsOpen(!isOpen);
              }}
            />
          </Modal>
        )}
      </>
    );
  };
}
