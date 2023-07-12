import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import { UserFriendsType } from "@/__generated__/graphql";
import { makeVar, useReactiveVar } from "@apollo/client";


export const userVar = makeVar<UserAndPrefferncesType|null>(null);
export const visitedPersonVar = makeVar<UserAndPrefferncesType|null>(null);
export const visitedPersonFriendsVar = makeVar<UserFriendsType|null>(null);
export const connectedUsersVar = makeVar<UserType[]|[]>([]);
