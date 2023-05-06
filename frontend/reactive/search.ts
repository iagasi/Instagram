import { UserAndPrefferncesType } from "@/../types/userType";
import { makeVar, useReactiveVar } from "@apollo/client";


export const searchBarVar = makeVar<boolean>(false);
