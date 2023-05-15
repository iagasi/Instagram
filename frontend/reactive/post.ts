import { postType } from "@/../types/postType";
import { makeVar } from "@apollo/client";


export const postVar = makeVar<postType[]>([]);