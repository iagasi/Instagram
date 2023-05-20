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

export type FriendsHandlerType = {
  candidateId?: InputMaybe<Scalars['String']>;
  myId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  commentPost?: Maybe<Scalars['String']>;
  deleteFollower?: Maybe<PrefferencesType>;
  deleteFollowing?: Maybe<PrefferencesType>;
  likePost?: Maybe<PostType>;
  subscribeTo?: Maybe<PrefferencesType>;
};


export type MutationCommentPostArgs = {
  input?: InputMaybe<CommentPostInput>;
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


export type MutationSubscribeToArgs = {
  input?: InputMaybe<FriendsHandlerType>;
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
  getFriendsPosts?: Maybe<Array<Maybe<PostType>>>;
  getPostById?: Maybe<PostType>;
  getPostCommentsAndAuthors?: Maybe<Array<Maybe<UserCommetType>>>;
  getPostLikedPersons?: Maybe<Array<Maybe<UserType>>>;
  getUserData?: Maybe<PrefferencesType>;
  getUserFriends?: Maybe<UserFriendsType>;
  getUserPrefferences?: Maybe<Array<Maybe<UserPrefferencesType>>>;
};


export type QueryFindByNameSurnameArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetFriendsPostsArgs = {
  id?: InputMaybe<Scalars['String']>;
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

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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

export type LikePostInput = {
  personId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
};

export type PostType = {
  __typename?: 'postType';
  _id?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Scalars['String']>>>;
  image?: Maybe<Scalars['String']>;
  likes?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId?: Maybe<Scalars['String']>;
};

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

export type GetUserFriendsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetUserFriendsQuery = { __typename?: 'Query', getUserFriends?: { __typename?: 'UserFriendsType', followers?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, surname?: string | null, image?: string | null } | null> | null, followings?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, surname?: string | null, image?: string | null } | null> | null } | null };


export const CommentPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"commentPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"personId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}]}]}}]} as unknown as DocumentNode<CommentPostMutation, CommentPostMutationVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"personId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<LikePostMutation, LikePostMutationVariables>;
export const GetPostLikedPersonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostLikedPersons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostLikedPersons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<GetPostLikedPersonsQuery, GetPostLikedPersonsQueryVariables>;
export const GetCommentPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCommentPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostCommentsAndAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentMaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"time"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentPostQuery, GetCommentPostQueryVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;
export const GetUserFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFriends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserFriendsQuery, GetUserFriendsQueryVariables>;