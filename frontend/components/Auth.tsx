import { WithModal } from "@/Hoc/WithModal";
import { useLogin, useRegister } from "@/hooks/authService";
import { withModalType } from "@/types/modalTypes";
import Image from "next/image";
import React, { useState } from "react";
import Loading from "./Loading";

import { useForm } from "react-hook-form";
import axios from "axios";
import { LStorage } from "@/helpers/user";
import { useRouter } from "next/router";
import Description from "./Description";
const LOGIN_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const input =
  " p-1 w-full border  border-gray-300  rounded-md mt-9 focus:outline-0 focus:border-green-700";
  type FormValues = {
    email: string;    password: string
  }


class AuthBoundary extends React.Component<{ children: JSX.Element }> {
  state: {
    error: string;
    hasError: boolean;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
    };
  }
  static getDerivedStateFromError() {
    // Update state to indicate that an error has occurred
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error: error });
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return (
        <div className=" text-red-500 text-2xl text-center mt-10 ">
          Auth {this.state?.error.toString()}
          <br></br>
          Something went wrong.
          <span
            className=" bg-slate-500 p-1 text-white cursor-pointer"
            onClick={() => this.setState({ hasError: false })}
          >
            Please try again later.
          </span>
          <hr></hr>
        </div>
      );
    }

    return this.props.children;
  }
}
function Auth() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);
  const [logData, setLogdata] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  //
 
  
  const onSubmit = async (data: { email: string; password: string }) => {
    setServerError("");
    if (logData && LOGIN_URL) {
      setLoading(true);

      const res = await axios.post(
        LOGIN_URL + "/login",
        
        { email: data.email, password: data.password },
        { withCredentials: true,
         }
      );
      if (typeof res.data === "string") {
        setServerError(res.data);
        setLoading(false);
        return;
      }

      LStorage.setUser(res.data);
      setLoading(false);
      router.push("/");
    }
  };
  return (
    <div className=" flex bg-slate-100  justify-around h-screen items-center">
          <Description/>

      <div className="    flex flex-col items-center h-full   space-y-9">
        <div className=" p-3 border space-y-2 rounded-lg">
          <h3 className=" font-bold">
            {" "}
            You can register Or use (precreated Users{" "}
            <small className=" font-medium">recomended-</small>
            <br></br>{" "}
            <small className=" font-medium">
              because Profile Filled and there are ALREADY many subscriptions to other peoples
            </small>{" "}
            )
          </h3>
          <div className=" border rounded-md p-2">
            <div>
              Email : <span className=" font-bold">user1@gmail.com</span>
            </div>
            <div>
              Password :<span className=" font-bold">123456</span>
            </div>
          </div>

          <div className=" border rounded-md p-2">
            <div>
              Email : <span className=" font-bold">user2@gmail.com</span>
            </div>
            <div>
              Password :<span className=" font-bold">123456</span>
            </div>
          </div>
        </div>
        <div className="  shadow-xl  relative border-zinc-300 w-[300px] p-10 rounded-lg">
          <div className=" w-full flex justify-center">
             <Image
            className=" absolute left-0 right-0 top-2 block mx-auto"
            src="/bglogo.png"
            alt="logo"
            width={150}
            height={50}
          /> 
          </div>
        
          <div className=" text-red-500 h-5">
            <div> {errors.email && errors.email.message?.toString()}</div>
            <div> {errors.password && errors.password.message?.toString()}</div>
            {serverError.toString()}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={input}
              {...register("email", {
                required: " * Email Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: " * Invalid email address",
                },
              })}
              placeholder="Email"
              type="text"
            />

            <input
              className={input}
              placeholder="Password"
              type="password"
              {...register("password", {
                validate: (value) => {
                  const { password } = getValues();
                  if (!password.length) {
                    return "* Password required";
                  }
                  if (password.length < 6) {
                    return "* Passwords length min 6!";
                  }
                },
              })}
            />

            <button className=" mt-5 text-white text-lg bg-blue-400 p-1 w-full rounded-lg">
              {!loading ? "Login" : "Loading"}
            </button>
          </form>

          <h3 className=" text-center">OR</h3>
          <WithRegister />
        </div>
      </div>
    </div>
  );
}
type RegisterFormType={
  email: string;    password: string;    name: string;    surname: string;
}

function Register(props: withModalType) {
  return (
    <button
      className=" text-blue-400  font-bold block mx-auto p-1"
      onClick={() => props.setModal()}
    >
      Register
    </button>
  );
}
function RegisterPage(props: withModalType) {
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState("");
  const {
    handleSubmit,
    register: registerHook,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormType>();
  const onSubmit = async (data: {
    email: string;
    password: string;
    name: string;
    surname: string;
  }) => {
    console.log(errors);

    setLoading(true);
    const res = await axios.post(LOGIN_URL + "/register", {
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
    });
    setLoading(false);
    setResData(res.data);
  };

  return (
    <div className=" flex flex-col  ">
      <div className=" w-fit self-center pt-3">
        <Image
          className=""
          src="/bglogo.png"
          alt="logo"
          width={150}
          height={50}
        />
      </div>
      <div className=" p-20 pt-0">
        <h1 className=" text-center pt-5 text-2xl text-blue-500">Register</h1>
        <form className=" flex flex-col  " onSubmit={handleSubmit(onSubmit)}>
          <input
            className={input}
            placeholder="Email"
            type="text"
            {...registerHook("email", {
              required: " * Email Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: " * Invalid email address",
              },
            })}
          />
          <input
            className={input}
            placeholder="Password"
            type="text"
            {...registerHook("password", {
              validate: (value) => {
                const { password } = getValues();
                if (!password.length) {
                  return "* Password required";
                }
                if (password.length < 6) {
                  return "* Passwords length min 6!";
                }
              },
            })}
          />
          <input
            className={input}
            placeholder="name"
            type="text"
            {...registerHook("name", {
              validate: (value) => {
                const { name } = getValues();
                if (!name.length) {
                  return "* Name required";
                }
                if (name.length>15) {
                  return "* Name must be less than 15 char";
                }
              },
            })}
          />
          <input
            className={input}
            placeholder="surname"
            type="text"
            {...registerHook("surname", {
              validate: (value) => {
                const { surname } = getValues();
                if (!surname.length) {
                  return "* Surname required";
                }
                if (surname.length < 2) {
                  return "* Surname min 2 characters!";
                }
                if (surname.length>20) {
                  return "* Surname must be less than 20 char";
                }
              },
            })}
          />
          <button
            className=" text-blue-400  font-bold block mx-auto  bg-slate-200 p-2 rounded-md mt-5"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className=" text-red-500 h-5">
          <div> {errors.email && errors.email.message?.toString()}</div>
          <div> {errors.password && errors.password.message?.toString()}</div>
          <div> {errors.name && errors.name.message?.toString()}</div>
          <div> {errors.surname && errors.surname.message?.toString()}</div>
        </div>
        <div className="  font-bold text-green-600  flex  justify-center pt-5">
          {loading && (
            <div>
              <Loading size="30" />
            </div>
          )}
          {resData}
        </div>
      </div>
    </div>
  );
}

const WithRegister = WithModal(Register, RegisterPage);

const withBounday = () => (
  <AuthBoundary>
    <Auth />
  </AuthBoundary>
);
export default withBounday;
