import React from "react";
import { useLoaderData } from "react-router-dom";
import BikeCard from "./BikeCard";

const Bikes = () => {
  const bikes = useLoaderData();
  console.log(bikes);
  return (
    <div className="mx-5">
      <h1 className="text-center text-2xl font-bold my-12">
        Pick Your Dream Bike here
      </h1>
      <div className="mt-8">
        <p>Total Bike Collection : {bikes.length}</p>
        <div className="grid gap-6 my-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard key={bike._id} bikeInfo={bike}></BikeCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bikes;
