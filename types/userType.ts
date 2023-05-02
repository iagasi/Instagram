export type UserType = {
  _id: string;
  name: string;
  surname: string;
  image: string;
};

export type userActions = {
  _id: string;
  userId: UserType["_id"];
  posts: [];
  saved: [];
  tagged: [];
};

export type UserFolowers = {
  _id: string;
  userId: UserType["_id"];
  followers: UserType[];
};
