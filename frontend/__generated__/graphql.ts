/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateChatInput = {
  user1Id?: InputMaybe<Scalars['String']>;
  user2Id?: InputMaybe<Scalars['String']>;
};

export type CreateChatType = {
  __typename?: 'CreateChatType';
  _id?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FriendsHandlerType = {
  candidateId?: InputMaybe<Scalars['String']>;
  myId?: InputMaybe<Scalars['String']>;
};

export type GetChatsType = {
  __typename?: 'GetChatsType';
  chat?: Maybe<ChatType>;
  chatWithInfo?: Maybe<UserType>;
};

export type LoginType = {
  __typename?: 'LoginType';
  _id?: Maybe<Scalars['String']>;
  acessToken?: Maybe<Scalars['String']>;
};

export type MessagaeType = {
  __typename?: 'MessagaeType';
  _id?: Maybe<Scalars['String']>;
  chatId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  timeStamp?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  chatId?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  timeStamp?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeNameSurname?: Maybe<User>;
  commentPost?: Maybe<Scalars['String']>;
  createChat?: Maybe<CreateChatType>;
  deleteChat?: Maybe<Scalars['String']>;
  deleteFollower?: Maybe<PrefferencesType>;
  deleteFollowing?: Maybe<PrefferencesType>;
  likePost?: Maybe<PostType>;
  register?: Maybe<Scalars['String']>;
  sendMessage?: Maybe<MessagaeType>;
  subscribeTo?: Maybe<PrefferencesType>;
  unreadChatMessagesDelete?: Maybe<Scalars['String']>;
  unreadMessageSet?: Maybe<Scalars['String']>;
};


export type MutationChangeNameSurnameArgs = {
  input?: InputMaybe<ChangeNameSurnameType>;
};


export type MutationCommentPostArgs = {
  input?: InputMaybe<CommentPostInput>;
};


export type MutationCreateChatArgs = {
  input?: InputMaybe<CreateChatInput>;
};


export type MutationDeleteChatArgs = {
  input?: InputMaybe<DeleteChatInput>;
};


export type MutationDeleteFollowerArgs = {
  input?: InputMaybe<FriendsHandlerType>;
};


export type MutationDeleteFollowingArgs = {
  input?: InputMaybe<FriendsHandlerType>;
};


export type MutationLikePostArgs = {
  input?: InputMaybe<LikePostInput>;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<InputRegister>;
};


export type MutationSendMessageArgs = {
  input?: InputMaybe<MessageInput>;
};


export type MutationSubscribeToArgs = {
  input?: InputMaybe<FriendsHandlerType>;
};


export type MutationUnreadChatMessagesDeleteArgs = {
  input?: InputMaybe<DeleteUnreadType>;
};


export type MutationUnreadMessageSetArgs = {
  input?: InputMaybe<UnreadMessageInput>;
};

export type PrefferencesType = {
  __typename?: 'PrefferencesType';
  prefferences?: Maybe<UserPrefferencesType>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  findByNameSurname?: Maybe<Array<Maybe<User>>>;
  findUser?: Maybe<User>;
  getChats?: Maybe<Array<Maybe<GetChatsType>>>;
  getFriendsPosts?: Maybe<Array<Maybe<PostType>>>;
  getMessages?: Maybe<Array<Maybe<MessageType>>>;
  getPostById?: Maybe<PostType>;
  getPostCommentsAndAuthors?: Maybe<Array<Maybe<UserCommetType>>>;
  getPostLikedPersons?: Maybe<Array<Maybe<UserType>>>;
  getUserData?: Maybe<PrefferencesType>;
  getUserFriends?: Maybe<UserFriendsType>;
  getUserPrefferences?: Maybe<Array<Maybe<UserPrefferencesType>>>;
  login?: Maybe<LoginType>;
  unreadMessagesGet?: Maybe<Array<Maybe<UnreadMessageType>>>;
};


export type QueryFindByNameSurnameArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetChatsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetFriendsPostsArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetMessagesArgs = {
  chatId?: InputMaybe<Scalars['String']>;
};


export type QueryGetPostByIdArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryGetPostCommentsAndAuthorsArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryGetPostLikedPersonsArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserDataArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserFriendsArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserPrefferencesArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type QueryUnreadMessagesGetArgs = {
  userId?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  listenMessages?: Maybe<UnreadMessageType>;
  receiveMessage?: Maybe<MessagaeType>;
};


export type SubscriptionListenMessagesArgs = {
  input?: InputMaybe<InputReceiveMessage>;
};


export type SubscriptionReceiveMessageArgs = {
  input?: InputMaybe<InputReceiveMessage>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
};

export type UserCommetType = {
  __typename?: 'UserCommetType';
  comment?: Maybe<CommentType>;
  commentMaker?: Maybe<UserType>;
};

export type UserFriendsType = {
  __typename?: 'UserFriendsType';
  followers?: Maybe<Array<Maybe<User>>>;
  followings?: Maybe<Array<Maybe<User>>>;
};

export type UserPrefferencesType = {
  __typename?: 'UserPrefferencesType';
  _id?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<Scalars['String']>>>;
  followings?: Maybe<Array<Maybe<Scalars['String']>>>;
  posts?: Maybe<Array<Maybe<Scalars['String']>>>;
  saved?: Maybe<Array<Maybe<Scalars['String']>>>;
  tagged?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId?: Maybe<Scalars['String']>;
};

export type UserType = {
  __typename?: 'UserType';
  _id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
};

export type ChangeNameSurnameType = {
  myId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type ChatType = {
  __typename?: 'chatType';
  _id?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CommentPostInput = {
  _id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  personId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
};

export type CommentType = {
  __typename?: 'commentType';
  _id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  personId?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type DeleteChatInput = {
  chatId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type DeleteUnreadType = {
  chatId?: InputMaybe<Scalars['String']>;
};

export type InputReceiveMessage = {
  _id?: InputMaybe<Scalars['String']>;
  chatId?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  timeStamp?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type InputRegister = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type LikePostInput = {
  personId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
};

export type MessageType = {
  __typename?: 'messageType';
  _id?: Maybe<Scalars['String']>;
  chatId?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  timeStamp?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type PostType = {
  __typename?: 'postType';
  _id?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  likes?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId?: Maybe<Scalars['String']>;
};

export type UnreadMessageInput = {
  chatId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UnreadMessageType = {
  __typename?: 'unreadMessageType';
  _id?: Maybe<Scalars['String']>;
  chatId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type SubscribeGqlMutationVariables = Exact<{
  myId?: InputMaybe<Scalars['String']>;
  candidateId?: InputMaybe<Scalars['String']>;
}>;


export type SubscribeGqlMutation = { __typename?: 'Mutation', subscribeTo?: { __typename?: 'PrefferencesType', user: { __typename?: 'User', _id?: string | null }, prefferences?: { __typename?: 'UserPrefferencesType', followings?: Array<string | null> | null, followers?: Array<string | null> | null } | null } | null };

export type DeleteChatMutationVariables = Exact<{
  input?: InputMaybe<DeleteChatInput>;
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat?: string | null };

export type UnreadChatMessagesDeleteMutationVariables = Exact<{
  input?: InputMaybe<DeleteUnreadType>;
}>;


export type UnreadChatMessagesDeleteMutation = { __typename?: 'Mutation', unreadChatMessagesDelete?: string | null };

export type SendMessageMutationVariables = Exact<{
  input?: InputMaybe<MessageInput>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'MessagaeType', message?: string | null, timeStamp?: string | null, userId?: string | null } | null };

export type CommentPostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']>;
  personId?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
}>;


export type CommentPostMutation = { __typename?: 'Mutation', commentPost?: string | null };

export type LikePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']>;
  personId?: InputMaybe<Scalars['String']>;
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'postType', likes?: Array<string | null> | null, userId?: string | null } | null };

export type GetPostLikedPersonsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetPostLikedPersonsQuery = { __typename?: 'Query', getPostLikedPersons?: Array<{ __typename?: 'UserType', _id?: string | null, name?: string | null, surname?: string | null, image?: string | null } | null> | null };

export type GetCommentPostQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['String']>;
}>;


export type GetCommentPostQuery = { __typename?: 'Query', getPostCommentsAndAuthors?: Array<{ __typename?: 'UserCommetType', commentMaker?: { __typename?: 'UserType', name?: string | null, image?: string | null } | null, comment?: { __typename?: 'commentType', message?: string | null, time?: string | null } | null } | null> | null };

export type FindUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: { __typename?: 'User', _id?: string | null, name?: string | null, surname?: string | null, image?: string | null } | null };

export type ChangeNameSurnameTypeGhlMutationVariables = Exact<{
  myId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
}>;


export type ChangeNameSurnameTypeGhlMutation = { __typename?: 'Mutation', changeNameSurname?: { __typename?: 'User', _id?: string | null, name?: string | null, surname?: string | null } | null };


export const SubscribeGqlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubscribeGql"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"myId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeTo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"myId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"myId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prefferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followings"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}}]}}]}}]}}]} as unknown as DocumentNode<SubscribeGqlMutation, SubscribeGqlMutationVariables>;
export const DeleteChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"deleteChatInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteChatMutation, DeleteChatMutationVariables>;
export const UnreadChatMessagesDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnreadChatMessagesDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"deleteUnreadType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unreadChatMessagesDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UnreadChatMessagesDeleteMutation, UnreadChatMessagesDeleteMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const CommentPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"commentPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"personId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}]}]}}]} as unknown as DocumentNode<CommentPostMutation, CommentPostMutationVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"personId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<LikePostMutation, LikePostMutationVariables>;
export const GetPostLikedPersonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostLikedPersons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostLikedPersons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<GetPostLikedPersonsQuery, GetPostLikedPersonsQueryVariables>;
export const GetCommentPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCommentPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostCommentsAndAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentMaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentPostQuery, GetCommentPostQueryVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;
export const ChangeNameSurnameTypeGhlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeNameSurnameTypeGhl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"myId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeNameSurname"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"myId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"myId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"surname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surname"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}}]}}]}}]} as unknown as DocumentNode<ChangeNameSurnameTypeGhlMutation, ChangeNameSurnameTypeGhlMutationVariables>;