
export function changeCommetsLength(postId:string|undefined,length?:string){
    if(!postId) return
    const comments=document.querySelectorAll(`#commets-amount-${postId}`)
comments.forEach(c=>{
    c.innerHTML=length||""
})
}