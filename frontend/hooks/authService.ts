import { gql, useMutation, useQuery } from "@apollo/client";
import { UserType } from "../../types/userType";
import { Mutation, Query } from "@/__generated__/graphql";
import { useEffect, useState } from "react";
import { LStorage } from "@/helpers/user";

const registerGql = gql(`
mutation Register($input: inputRegister) {
    register(input: $input)
  }
`);

const loginGql = gql`
  query Login($password: String, $email: String, $name: String) {
    login(password: $password, email: $email, name: $name) {
      acessToken
      _id
    }
  }
`;
export function useLogin({
  email,
  password,
}: {
  email: string | null;
  password: string | null;
}) {
  const { data, refetch } = useQuery<Query>(loginGql,
     {
    variables: {
      email,
      password,
    },
    skip: !email || !password,
   context:{
    headers:{
      auth:"yes"
    }
   }
  });
  const save = {
    _id: data?.login?._id as string,
    acessToken: data?.login?.acessToken as string,
  };
  if (typeof save._id === "string" && typeof save.acessToken === "string") {
 console.log("zzzzzzzzzzzzzzzzzz");
 
    LStorage.setUser(save);
  }
  console.log(data?.login);

  return { data: data?.login, refetch };
}

export function useRegister() {
  const [registerFn, { data, loading, error }] =
    useMutation<Mutation>(registerGql);
  if (error) throw new Error(error.message);
  console.log(data);

  const register = ({
    name,
    surname,
    password,
    email,
  }: Omit<UserType, "_id" | "image">) => {
    registerFn({
      variables: { input: { name, surname, password, email },
     },
     context:{
      headers:{
        auth:"yes"
      }
     }
    });
  };
  const resData = data?.register;
  return { register, data: resData, loading };
}
