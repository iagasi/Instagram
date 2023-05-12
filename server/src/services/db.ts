import { UserPrefferencesType, UserType } from "../../../types/userType";
import {postType } from "../../../types/postType";

 export const users: UserType[] = [
    {
        _id: "1",
        name: "Georg",
        surname: "Herimand",
        image: "",
      },
      {
        _id: "2",
        name: "Alex",
        surname: "Jerix",
        image: "",
      },
      {
        _id: "3",
        name: "Ande",
        surname: "Avallon",
        image: "",
      }


]
  
   export const userPrefferences: UserPrefferencesType[] = [
    {
      _id: "456",
      userId: "1",
      followers: ["2","145","3"],
      followings:["2","3"],
      posts: ["1","5","8","77"],
      saved: ["4","55"],
      tagged: ["44","547","456","575745"],
    },

    {
        _id: "54",
        userId: "2",
        followers: ["1","145","444"],
        followings:["4", "5"],
        posts: ["51","65",],
        saved: ["4","55"],
        tagged: ["54","45","89","45"],
      },
      {
        _id: "45",
        userId: "3",
        followers: ["2","145","444"],
        followings:["4"],
        posts: ["1","5","8","77"],
        saved: ["66","55"],
        tagged: ["55","5453","666","55"],
      },
  ];


  export const posts:postType[]=[
{
  _id:"457",
  image:"",
  userId:"2",
  comments:["1"],
  likes:["1"]
},

{
  _id:"455",
  image:"",
  userId:"2",
  comments:["1","1","2"],
  likes:["1","3"]
},
{
  _id:"557",
  image:"",
  userId:"2",
  comments:["1","8"],
  likes:["1","56"]
},
{
  _id:"545",
  image:"",
  userId:"1",
  comments:[],
  likes:["3","2"]
},
{
  _id:"555",
  image:"",
  userId:"1",
  comments:["3","1"],
  likes:["2"]
},

{
  _id:"845",
  image:"",
  userId:"3",
  comments:["1","56"],
  likes:["1","2","45"]
},

{
  _id:"045",
  image:"",
  userId:"3",
  comments:["1","56","566","1","3"],
  likes:["1","2","45","4"]
},

{
  _id:"2",
  image:"",
  userId:"3",
  comments:["1","56","566","1","3"],
  likes:["1","2","45","4"]
},
  ]