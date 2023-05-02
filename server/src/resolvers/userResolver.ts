
import { UserType } from "../../../types/userType";
const user: UserType = {
  _id: "1",
  name: "Georg",
  surname: "Efsdffs",
  image: "",
};

export const userResolvers = {
    Query: {
      me: () => user,
    },
  };


  export const userTypeDefs  = `
type User{
 _id:String
   name: String
    surname: String
    image:String
}

type Query{
    me:User
}

`;