import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthProvider";
import BikeCard from "./BikeCard";
import BookingModal from "./BookingModal/BookingModal";

const Bikes = () => {
  const { user } = useContext(AuthContext);
  const bikes = useLoaderData();
  const [bikeData, setBikeData] = useState(null);
  const handleReport = (reportData) => {
    const report = {
      ...reportData,
      reporterName: user?.displayName,
      reporterEmail: user?.email,
    };

    fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bikeTraderToken")}`,
      },
      body: JSON.stringify(report),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Reported to admin successful");
        }
      });
  };
  return (
    <div className="mx-5">
      <h1 className="text-center text-2xl font-bold my-12">
        Pick Your Dream Bike here
      </h1>
      <div className="mt-8">
        <p>Total Bike Collection : {bikes.length}</p>
        <div className="grid gap-6 my-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard
              key={bike._id}
              bikeInfo={bike}
              setBikeData={setBikeData}
              handleReport={handleReport}
            ></BikeCard>
          ))}
        </div>
      </div>
      {bikeData && (
        <BookingModal
          bikeData={bikeData}
          setBikeData={setBikeData}
        ></BookingModal>
      )}
    </div>
  );
};

export default Bikes;
