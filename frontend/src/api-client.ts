import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL||'';

export const register= async ( formData:RegisterFormData)=>{
  const response= await fetch(`${API_BASE_URL}/api/users/register`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify( formData ),
  })
  if (!response.ok) {
    // Check if the response has a JSON content type
    
      const responseBody = await response.json();
      throw new Error(responseBody.message || 'Failed to register user');
   
    }
  }
 
export const signIn =async (formData:SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          credentials: "include",
          headers: {
          "Content-type": "application/json"
,
          },
          body:JSON.stringify(formData)
    })

    const body= await response.json();
    if(!response.ok){
       throw new Error(body.message);
    }
    return body;
}



export const validateToken= async ()=>{
   const response= await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials:"include",
    method: "GET",
   })
    if(!response.ok) throw new Error("token invalid");

    return response.json();
}


 export const signOut= async()=>{
  const response= await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials:"include",
    method: "POST",
   })
    if(!response.ok) throw new Error("Error during sign out");

     
 }