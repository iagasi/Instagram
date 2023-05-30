import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import { Query } from "@/__generated__/graphql";
import {  getUserAndPrefferencesGql, userFriendsGql,getPostCommentsAndAuthors } from "@/gql/user";
import { LStorage } from "@/helpers/user";
import { userVar, visitedPersonFriendsVar, visitedPersonVar } from "@/reactive/user";
import { useQuery, useReactiveVar } from "@apollo/client";
import { log } from "console";
import { useRouter } from "next/router";

export function useLogginedUserdata(){
    const { data: loggedUserData,refetch,loading } = useQuery<Query>(getUserAndPrefferencesGql , {
        variables: { Id: LStorage.getUser()?._id },
        skip: !LStorage.getUser()?._id,
      });
      const loggedData = loggedUserData?.getUserData as UserAndPrefferncesType;

    {
        return {
            loading,
            refetch,
           data: loggedData
        }
    }
}

export function useVisitedPageUser(){
    const router=useRouter()
    const RouterId = router.query.id as string;

    const { loading, data ,refetch} = useQuery(getUserAndPrefferencesGql, {
        variables: { Id: RouterId },
        skip: !router.isReady,
      });
      const visitedUserData = data?.getUserData as UserAndPrefferncesType;

   
        return {
            loading,
            data:visitedUserData,
            refetch
        }
}

export function usePageFriendsQuery(visitedUserId:string, skip:boolean){
    const router = useRouter();
    const {data:friendsData,refetch,loading}=useQuery<Query>(userFriendsGql,{
      variables:{id:visitedUserId},
      skip:skip||!visitedUserId
    }
    ); 
    
    
    const friends=friendsData?.getUserFriends
   
    return{
        refetch,
        loading,
        data:friends

    }
}

export function useGetPostCommentsAndAuthors(postId:string){
    const router=useRouter()
    const RouterId = router.query.id as string;

    const {data, loading,refetch}=useQuery<Query>(getPostCommentsAndAuthors,{
        variables:{
            postId:postId},
            skip:!postId
        
    })


    return {data ,loading,refetch}
}