import {  hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
 
const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {  hotelFacilities.map((faciliti) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={faciliti}
            checked={ selectedFacilities.includes(faciliti)}
            onChange={onChange}
          />
          <span>{faciliti} </span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
