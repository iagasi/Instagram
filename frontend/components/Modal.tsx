import { AiOutlineClose } from "react-icons/ai";

type propsType = {
  setModal: () => void;
};

type propsModalType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  Data: (setModal: propsType) => JSX.Element;
};
export function Modal({ modal, setModal, Data }: propsModalType) {
  function toggle() {
    setModal(!modal);
  }
  return (
    <div
      className=" absolute w-screen h-screen top-0 left-0 bg-neutral-600 bg-opacity-70	 flex items-center justify-center "
      onClick={(e) => {
        setModal(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" p-5 w-[500px] h-[500px] bg-white"
      >
        <button
          className=" absolute  w-8 h-8 right-9 top-9 p-1 rounded-sm text-black text-3xl  flex items-center justify-center "
          onClick={() => setModal(false)}
        >
          <AiOutlineClose className=" hover:text-red-900" />
        </button>
        <Data setModal={() => toggle()} />
      </div>
    </div>
  );
}
