import { gql } from "@apollo/client";


export const $gePostByIdGql=gql(`query GetPostById($postId:String){
    getPostById (postId:$postId){
      _id
      image
      userId
      likes
    }
  }`
  )