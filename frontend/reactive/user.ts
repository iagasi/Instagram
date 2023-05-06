import { UserAndPrefferncesType } from "@/../types/userType";
import { makeVar, useReactiveVar } from "@apollo/client";


export const userVar = makeVar<UserAndPrefferncesType|null>(null);
