

export class CommentDto {
    userId:string
    message:string
    time:number
    constructor(userId:string,message:string){
        this.userId=userId
        this.message=message
        this.time=Date.now()
    }
}