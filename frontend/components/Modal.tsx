import { AiOutlineClose } from "react-icons/ai";

type propsType = {
  setModal: () => void;
 
};

type propsModalType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children:React.ReactNode;
};
export function Modal({ modal, setModal,children}: propsModalType) {
  function toggle() {
    setModal(!modal);
  }
  return (
    <div
    id="modal"
      className=" fixed z-30 w-screen h-screen top-0 left-0 bg-neutral-600 bg-opacity-70	 flex items-center justify-center "
      onClick={(e) => {
        setModal(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{width:"max-content"}}
      
        className="  bg-white rounded-lg"
      >
        <button
          className=" absolute  w-8 h-8 right-9 top-9 p-1 rounded-sm text-black text-3xl  flex items-center justify-center "
          onClick={() => setModal(false)}
        >
          <AiOutlineClose className=" hover:text-red-900 text-white" />
        </button>
        {
          children
        }
      </div>
    </div>
  );
}
