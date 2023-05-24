import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import React from "react";
import UserPreview from "../UserPreview";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/reactive/user";
import { Settings } from "./Settings";
import ChangePhoto from "./ChangePhoto";
import { useForm,SubmitHandler } from "react-hook-form";
interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}
function EditProfileBtn(props: withModalType) {

  return (
    <>
      <button
        className=" bg-gray-300 hover:bg-gray-400 p-2 rounded-lg"
        onClick={() => props.setModal()}
      >
        Edit pofile
      </button>
    </>
  );
}


function EditProfile(props: Pick<withModalType, "setModal">) {
  const iAmUser = useReactiveVar(userVar);
  const { register, handleSubmit,formState:{ errors }  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  return (
    <div className=" w-[500px] h-[500px]  font-medium">
      <div className="relative w-fit">
        <UserPreview user={iAmUser?.user} />
        <ChangePhoto user={iAmUser?.user} />
      </div>
      <div className=" text-center mt-8 mb-7 text-xl"> Change your data</div>
      <form action="post" className=" flex flex-col space-y-2 m-auto items-center"
      onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-2  w-[200px] justify-between">
        <h4 className="relative ">Name
          {errors.firstName&& <div className=" absolute  -left-32 top-0 text-red-500 ">Min-1 Max-20</div> }
          </h4>
          <input
            className=" border-stone-500 border-[1px] w-3/5"
            type="text   "
            defaultValue={iAmUser?.user.name}
            {...register("firstName", { required: true, maxLength: 20 , })}
          ></input>
       
        </div>
        <div className=" relative flex space-x-2 w-[200px] justify-between">
                

          <h4 className="relative ">Surname
          {errors.lastName&& <div className=" absolute  -left-32 top-0 text-red-500 ">Min-1 Max-20</div> }
          </h4>

          <input
            className=" border-stone-500 border-[1px] w-3/5"
            type="text   "
            defaultValue={iAmUser?.user.surname}
            {...register("lastName", { required: true, maxLength: 20 })}
          ></input>
        </div>
        {/* <div className="flex space-x-2 w-[200px] justify-between pb-10">
        <h4 className="relative ">Age
          {errors.age&& <div className=" absolute   -left-36 top-0 text-red-500 ">min age 18 max 99</div> }
          </h4>
          <input
            className=" border-stone-500 border-[1px] w-3/5"
            type="text   "
            {...register("age", { min: 18, max: 99 })}
          ></input>
    
        </div > */}
        <button  className=" block submit-btn mt-7 " type="submit" >Submit</button>

      </form>
    </div>
  );
}
export default WithModal(EditProfileBtn, EditProfile);
