import React from "react";

const BikeCard = ({ bikeInfo, setBikeData }) => {
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
  } = bikeInfo;
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
              className="btn btn-primary my-4 w-full"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
