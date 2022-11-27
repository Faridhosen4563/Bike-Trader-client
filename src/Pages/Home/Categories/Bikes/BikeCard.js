import { useQuery } from "@tanstack/react-query";
import React from "react";

import { FcApproval } from "react-icons/fc";

const BikeCard = ({ bikeInfo, setBikeData, handleReport }) => {
  const {
    img,
    name,
    Bike,
    price,
    location,
    date,
    phone,
    Condition,
    Running,
    uses,
    sold,
  } = bikeInfo;

  const { data: user = {} } = useQuery({
    queryKey: ["user", bikeInfo?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/user/sellerVerify/${bikeInfo?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      {!sold && (
        <div className="card w-full shadow-xl">
          <figure>
            <img src={img} alt={Bike} className="rounded-xl w-full h-72" />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center">
                <h2 className="card-title mr-2">{name}</h2>
                {user?.verify && <FcApproval></FcApproval>}
              </div>
              <button
                onClick={() => handleReport(bikeInfo)}
                className="btn btn-error btn-xs"
              >
                Report to Admin
              </button>
            </div>
            <p className=" font-semibold">Bike Model : {Bike}</p>
            <p>Price : ${price}</p>
            <p>Location : {location}</p>
            <p>Running : {Running}</p>
            <p>Year of Uses : {uses}</p>
            <p>Bike Condition : {Condition}</p>
            <hr />
            <p>Seller Contact information</p>
            <hr />
            <p>Phone : {phone}</p>
            <p>Post Date : {date}</p>
            <div className="card-actions w-full">
              <label
                onClick={() => setBikeData(bikeInfo)}
                htmlFor="booking-modal"
                className="btn btn-primary bg-gradient-to-r from-sky-500 to-indigo-500 my-4 w-full"
              >
                Book Now
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeCard;
