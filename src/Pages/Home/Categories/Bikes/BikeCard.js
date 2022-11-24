import React from "react";

const BikeCard = ({ bikeInfo }) => {
  const { img, name, Bike, price, location, date, phone, Condition, Running } =
    bikeInfo;
  return (
    <div>
      <div className="card w-full shadow-xl">
        <figure>
          <img src={img} alt={Bike} className="rounded-xl w-full h-72" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className=" font-semibold">Bike Model : {Bike}</p>
          <p>Price : ${price}</p>
          <p>Location : {location}</p>
          <p>Running : {Running}</p>
          <p>Bike Condition : {Condition}</p>
          <hr />
          <p>Seller Contact information</p>
          <hr />
          <p>Phone : {phone}</p>
          <p>Post Date : {date}</p>
          <div className="card-actions w-full">
            <button className="btn btn-primary my-4 w-full">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;