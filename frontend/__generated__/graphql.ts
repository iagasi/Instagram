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

export type Mutation = {
  __typename?: 'Mutation';
  likePost?: Maybe<PostType>;
};


export type MutationLikePostArgs = {
  input?: InputMaybe<LikePostInput>;
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
  getUserData?: Maybe<PrefferencesType>;
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


export type QueryGetUserDataArgs = {
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

export type FindUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: { __typename?: 'User', _id?: string | null, name?: string | null, surname?: string | null, image?: string | null } | null };

export type LikePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['String']>;
  personId?: InputMaybe<Scalars['String']>;
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'postType', likes?: Array<string | null> | null, userId?: string | null } | null };


export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"personId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<LikePostMutation, LikePostMutationVariables>;