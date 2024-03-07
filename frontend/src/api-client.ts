import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL||'';

export const register= async ( formData:RegisterFormData)=>{
  const response= await fetch(`${API_BASE_URL}/api/users/register`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify( formData ),
  })
  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok) {
    // Check if the response has a JSON content type
    
      
      throw new Error(responseBody.message || 'Failed to register user');
   
    } 
    return responseBody;
  }
 
  export const signIn = async (formData: SignInFormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const body = await response.json();
  
      if (!response.ok) {
        throw new Error(body.message);
      }
      console.log(body) ;
      return body;

      
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  };
  



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
    method: "POST",
    credentials:"include",
  
   })
    if(!response.ok) throw new Error("Error during sign out");

     
 }


 export const addMyHotel = async(hotelFormData:FormData)=>{
  const response= await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials:"include",
    method: "POST",
    body:hotelFormData,
   })
    if(!response.ok) throw new Error("Failed to add hotel");
      
    return response.json();
 }


 export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
 
  return response.json();
};

export const fetchMyHotelById= async (hotelId:string)=>{
   const response= await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
      credentials: "include",
   })
   if(!response.ok){
    throw new Error("Error fetching Hoteld")
   }
   return response.json();
 }


 export const updateMyHotelById=  async (hotelFormData:FormData)=>{
  const response= await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
    method:"PUT",
    body:hotelFormData,
    credentials: "include",
 })
 if(!response.ok){
  throw new Error("Failed to update Hotel")
 }
 return response.json();
 }