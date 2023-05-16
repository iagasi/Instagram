import { UserPrefferencesType, UserType } from "../../../types/userType";
import { commentType, postType } from "../../../types/postType";
export function getUserById(userId:string):Promise<UserType|undefined>{
return new Promise((res,rej)=>{
  res(users.find(user=>user._id===userId))
})
}
export const users: UserType[] = [
  {
    _id: "1",
    name: "Georg",
    surname: "Herimand",
    image: "user-images/1.jpg",
  },
  {
    _id: "2",
    name: "Alex",
    surname: "Jerix",
    image: "user-images/2.jpg",
  },
  {
    _id: "3",
    name: "Ande",
    surname: "Avallon",
    image: "user-images/3.jpg",
  },
];

export const userPrefferences: UserPrefferencesType[] = [
  {
    _id: "456",
    userId: "1",
    followers: ["2", "145", "3"],
    followings: ["2", "3"],
    posts: ["1", "5", "8", "77"],
    saved: ["4", "55"],
    tagged: ["44", "547", "456", "575745"],
  },

  {
    _id: "54",
    userId: "2",
    followers: ["1", "145", "444"],
    followings: ["4", "5"],
    posts: ["51", "65"],
    saved: ["4", "55"],
    tagged: ["54", "45", "89", "45"],
  },
  {
    _id: "45",
    userId: "3",
    followers: ["2", "145", "444"],
    followings: ["4"],
    posts: ["1", "5", "8", "77"],
    saved: ["66", "55"],
    tagged: ["55", "5453", "666", "55"],
  },
];

export const posts: postType[] = [
  {
    _id: "457",
    image: "images/1.jpg",
    userId: "2",
    comments: ["5","6","7"],
    likes: ["5"],
  },

  {
    _id: "455",
    image: "images/2.jpg",
    userId: "2",
    comments: ["1", "2"],
    likes: ["1", "3"],
  },
  {
    _id: "557",
    image: "images/3.jpg",
    userId: "2",
    comments: ["5", "8"],
    likes: ["", "56"],
  },
  {
    _id: "545",
    image: "images/4.jpg",
    userId: "1",
    comments: [],
    likes: ["3", "2"],
  },
  {
    _id: "555",
    image: "",
    userId: "1",
    comments: ["3", "1"],
    likes: ["2"],
  },

  {
    _id: "845",
    image: "",
    userId: "3",
    comments: ["1", "56"],
    likes: ["1", "2", "45"],
  },

  {
    _id: "045",
    image: "",
    userId: "3",
    comments: ["1", "56", "566", "1", "3"],
    likes: ["1", "2", "45", "4"],
  },

  {
    _id: "2",
    image: "",
    userId: "3",
    comments: ["1", "56", "566", "1", "3"],
    likes: ["1", "2", "45", "4"],
  },
];

export const comments: commentType[] = [
  {
    _id: "1",
    postId: "457",
    personId: "1",
    message: " Beautifl photo Alex",
    time: "1000",
  },
  {
    _id: "2",
    postId: "458",
    personId: "2",
    message: " Thanks georgh",
    time: "100450",
  },
  {
    _id: "3",
    postId: "459",
    personId: "1",
    message: "geo post hffghfghfg",
    time: "100450",
  },
  {
    _id: "4",
    postId: "455",
    personId: "3",
    message: "andre pot",
    time: "100450",
  },
  {
    _id: "5",
    postId: "457",
    personId: "3",
    message: " I like in Alex from andre",
    time: "1000",
  },
  {
    _id: "6",
    postId: "457",
    personId: "2",
    message: "tnalks andre  from alex",
    time: "1000",
  },
  {
    _id: "7",
    postId: "457",
    personId: "3",
    message: " havenicce day from andre",
    time: "1000",
  },
];

export const dbComments = (): Promise<commentType[]> => {
  return new Promise((res, rej) => {
    res(comments);
  });
};

export const dbCommentsById = (id: string): Promise<commentType|undefined> => {
  return new Promise((res, rej) => {
    res(comments.find((c) => c._id == id));
  });
};
