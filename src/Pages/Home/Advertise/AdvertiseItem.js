import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdvertiseItem = ({ advertise }) => {
  const { data: bikesData = {} } = useQuery({
    queryKey: ["bikesData", advertise?.advData],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bikes/${advertise?.advData}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (!bikesData.sold) {
    return (
      <div className="flex items-center justify-center">
        <div className="card w-96 bg-base-100 border-2 border-black p-10 shadow-2xl ">
          <figure>
            <img src={bikesData?.img} alt={bikesData?.Bike} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {bikesData?.Bike}
              <div className="badge badge-secondary">OFFER</div>
            </h2>
            <p>{bikesData?.Description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{bikesData?.price}</div>
              <div className="badge badge-outline">{bikesData?.location}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AdvertiseItem;
