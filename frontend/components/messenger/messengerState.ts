import {  messageType } from "@/../types/chatType";
import { UserType } from "@/../types/userType";
import { makeVar } from "@apollo/client";

export const showEmojiVar = makeVar(false)
export const chatIdVar=makeVar<string|null>(null)

export const iAmMessagingWithVar=makeVar<UserType|null>(null)


export const mySocketIdVar=makeVar<string|null>(null)




