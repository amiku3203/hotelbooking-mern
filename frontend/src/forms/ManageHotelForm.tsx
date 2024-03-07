import { FormProvider, useForm } from "react-hook-form";
import DetailsSections from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../backend/src/shared/types";
import { useEffect } from "react";
 
export type HotelFormData ={
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    adultCount:number;
    childCount:number;
    facilities:string[];
    pricePerNight:number;
    imageFiles:FileList;
    imageUrls:string[];
    lastUpdated:Date;
    starRating:number;
}

type Props={
  hotel?:HotelType
  onSave:(hotelFormData:FormData)=>void;
  isLoading:boolean

}
 
const ManageHotelForm = ({ onSave, isLoading ,hotel}: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit,reset } = formMethods;

 useEffect(()=>{
  reset(hotel);
 },[hotel,reset])

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
   console.log(formDataJson);
   if(hotel){
    formData.append("hotelId",hotel._id);
   }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    formData.append("pricePerNight", formDataJson.pricePerNight.toString());

  
  if(formDataJson.imageUrls){
    formDataJson.imageUrls.forEach((url, index) => {
     formData.append(`imageUrl[${index}]`, url);
    })
  }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    formData.append("starRating", formDataJson.starRating.toString());

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSections />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
