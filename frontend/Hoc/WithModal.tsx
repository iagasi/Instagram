import { Modal } from "@/components/Modal";
import { withModalType } from "@/types/modalTypes";
import React, { useState } from "react";

type propsType = {
  BaseComponent: (props: withModalType & any) => JSX.Element;
  ModalInnerData: (setModal: () => void) => JSX.Element;
};

export function WithModal<T>(
  BaseComponent: propsType["BaseComponent"],
  ModalInnerData: (props: T) => JSX.Element
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
