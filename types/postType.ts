export type postType={
    _id:string
    userId:string
    image:string
    likes: string[]
    comments:string[]

}

export type commentType={
    _id:string
   personId:string
   postId:string
    message:string
    time:number
  }