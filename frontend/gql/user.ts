// import { gql } from "@/__generated__/gql";
import { gql } from "@apollo/client";

export const getUserAndPrefferencesGql = gql(`
query getUserAndPrefferences($Id: String) {
  getUserData(id: $Id) {
    user {
      _id
      name
      surname
      image
    }
    prefferences {
      followers
      followings
      posts
    }
  }
}
`); //


export const DeleteFollowerGql =gql(`
mutation  DeleteFollower($myId:String $candidateId:String){
  deleteFollower(input:{myId:$myId candidateId:$candidateId }) {
    user {
      _id
      name
      surname
      image
    }
    prefferences {
      followers
      followings
      posts
    }
  }
}
`)

export const DeleteFollowingGql =gql(`
mutation  Deletefollowing($myId:String $candidateId:String){
  deleteFollowing(input:{myId:$myId candidateId:$candidateId }) {
    user {
      _id
      name
      surname
      image
    }
    prefferences {
      followers
      followings
      posts
    }
  }
}
`)

export const userFriendsGql=gql(`
query GetUserFriends($id:String) {
  getUserFriends (id:$id){
    followers {
      _id
      name
      surname
      image
    }
    followings {
      _id
      name
      surname
      image
    }
  }
}`) 