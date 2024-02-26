import { useMutation, useQueryClient } from "react-query"
import *as apiClient from "../api-client" 
import { useAppContext } from "../contexts/AppContexts"
import { useNavigate } from "react-router-dom";
 
const SignOutButton = () => {
     const queryClient= useQueryClient();
     const navigate= useNavigate();
    const {showToast}= useAppContext();
     const mutation = useMutation(apiClient.signOut,{
         onSuccess:async ()=>{
             //show toast
             await queryClient.invalidateQueries("validateToken");
             showToast({message:"Signed Out!", type:"SUCCESS"})
             navigate("/sign-in")
         },
         onError:async(error:Error)=>{
            //show toast
            showToast({message:error.message, type:"ERROR"});
          
           
         }
     })

     const handleClick= ()=>{
         mutation.mutate()
     }
      
  return (
      <button className="text-nlue-600 px-3 fonr-bold bg-white hover:bg-gray-100" onClick={handleClick}>

        Sign out
      </button>
  )
}

export default SignOutButton
