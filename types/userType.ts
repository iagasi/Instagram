export type UserType = {
  _id: string;
  name: string;
  surname: string;
  image: string;
};

export type userActions = {
  _id: string;
  userId: UserType["_id"];
  
};

export type UserPrefferencesType = {
  _id: string;
  userId: UserType["_id"];
  followers: string[];
  followings:string[]
  posts: string[];
  saved: string[];
  tagged: string[];
};
