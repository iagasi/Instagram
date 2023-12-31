/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    " mutation SubscribeGql($myId:String $candidateId:String){\n  subscribeTo (input:{myId:$myId candidateId:$candidateId }) {\n   user {\n     _id\n   }\n   prefferences {\n     followings\n     followers\n   }\n  }\n  }": types.SubscribeGqlDocument,
    "\nmutation DeleteChat($input: deleteChatInput) {\n    deleteChat(input: $input) \n  }\n\n": types.DeleteChatDocument,
    "\nmutation UnreadChatMessagesDelete($input: deleteUnreadType) {\n  unreadChatMessagesDelete(input: $input)\n}": types.UnreadChatMessagesDeleteDocument,
    "\nmutation sendMessage($input: MessageInput) {\n  sendMessage(input: $input) {\n    message\n    timeStamp\n    userId\n  }\n}\n": types.SendMessageDocument,
    "\n  mutation commentPost($postId:String,$personId:String,$message:String){\n    commentPost(input:{_id:$postId,personId:$personId,message:$message})\n  }\n  ": types.CommentPostDocument,
    "\nmutation LikePost ($postId:String,$personId:String) {\n\n  likePost(input:{postId:$postId,personId:$personId}) {\n  likes\n  userId\n  }\n  }\n  ": types.LikePostDocument,
    "\nquery getPostLikedPersons($id:String){\n \n    getPostLikedPersons(postId:$id) {\n        _id,\n      name,\n      surname,\n      image\n    }\n  }\n": types.GetPostLikedPersonsDocument,
    "\nquery GetCommentPost($postId:String){\n  getPostCommentsAndAuthors(postId:$postId) {\ncommentMaker {\n  name\n  image\n}\n comment {\n   message\n   time\n   \n }\n    \n  }\n}": types.GetCommentPostDocument,
    "\nquery findUser($id:String){\n  findUser(id:$id) {\n       _id\n    name\n    surname\n    image\n  }\n}\n": types.FindUserDocument,
    "\nmutation changeNameSurnameTypeGhl($myId:String $name:String $surname:String){\n  changeNameSurname (input:{myId:$myId name:$name surname:$surname }) {\n  _id\n  name,\n  surname\n  }\n  }\n": types.ChangeNameSurnameTypeGhlDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " mutation SubscribeGql($myId:String $candidateId:String){\n  subscribeTo (input:{myId:$myId candidateId:$candidateId }) {\n   user {\n     _id\n   }\n   prefferences {\n     followings\n     followers\n   }\n  }\n  }"): (typeof documents)[" mutation SubscribeGql($myId:String $candidateId:String){\n  subscribeTo (input:{myId:$myId candidateId:$candidateId }) {\n   user {\n     _id\n   }\n   prefferences {\n     followings\n     followers\n   }\n  }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteChat($input: deleteChatInput) {\n    deleteChat(input: $input) \n  }\n\n"): (typeof documents)["\nmutation DeleteChat($input: deleteChatInput) {\n    deleteChat(input: $input) \n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UnreadChatMessagesDelete($input: deleteUnreadType) {\n  unreadChatMessagesDelete(input: $input)\n}"): (typeof documents)["\nmutation UnreadChatMessagesDelete($input: deleteUnreadType) {\n  unreadChatMessagesDelete(input: $input)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation sendMessage($input: MessageInput) {\n  sendMessage(input: $input) {\n    message\n    timeStamp\n    userId\n  }\n}\n"): (typeof documents)["\nmutation sendMessage($input: MessageInput) {\n  sendMessage(input: $input) {\n    message\n    timeStamp\n    userId\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation commentPost($postId:String,$personId:String,$message:String){\n    commentPost(input:{_id:$postId,personId:$personId,message:$message})\n  }\n  "): (typeof documents)["\n  mutation commentPost($postId:String,$personId:String,$message:String){\n    commentPost(input:{_id:$postId,personId:$personId,message:$message})\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation LikePost ($postId:String,$personId:String) {\n\n  likePost(input:{postId:$postId,personId:$personId}) {\n  likes\n  userId\n  }\n  }\n  "): (typeof documents)["\nmutation LikePost ($postId:String,$personId:String) {\n\n  likePost(input:{postId:$postId,personId:$personId}) {\n  likes\n  userId\n  }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getPostLikedPersons($id:String){\n \n    getPostLikedPersons(postId:$id) {\n        _id,\n      name,\n      surname,\n      image\n    }\n  }\n"): (typeof documents)["\nquery getPostLikedPersons($id:String){\n \n    getPostLikedPersons(postId:$id) {\n        _id,\n      name,\n      surname,\n      image\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetCommentPost($postId:String){\n  getPostCommentsAndAuthors(postId:$postId) {\ncommentMaker {\n  name\n  image\n}\n comment {\n   message\n   time\n   \n }\n    \n  }\n}"): (typeof documents)["\nquery GetCommentPost($postId:String){\n  getPostCommentsAndAuthors(postId:$postId) {\ncommentMaker {\n  name\n  image\n}\n comment {\n   message\n   time\n   \n }\n    \n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery findUser($id:String){\n  findUser(id:$id) {\n       _id\n    name\n    surname\n    image\n  }\n}\n"): (typeof documents)["\nquery findUser($id:String){\n  findUser(id:$id) {\n       _id\n    name\n    surname\n    image\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation changeNameSurnameTypeGhl($myId:String $name:String $surname:String){\n  changeNameSurname (input:{myId:$myId name:$name surname:$surname }) {\n  _id\n  name,\n  surname\n  }\n  }\n"): (typeof documents)["\nmutation changeNameSurnameTypeGhl($myId:String $name:String $surname:String){\n  changeNameSurname (input:{myId:$myId name:$name surname:$surname }) {\n  _id\n  name,\n  surname\n  }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;