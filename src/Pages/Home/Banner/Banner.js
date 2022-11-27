import React from "react";
import img1 from "../../../assets/Banner/img1.jpg";
import img2 from "../../../assets/Banner/img2.jpg";
import img3 from "../../../assets/Banner/img3.jpg";
import img4 from "../../../assets/Banner/img4.jpg";
import img5 from "../../../assets/Banner/banner-bg.png";

const Banner = () => {
  return (
    <div
      className="hero rounded-lg"
      style={{
        backgroundImage: `url(${img5})`,
      }}
    >
      <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-10">
          <h1 className="text-5xl font-bold">Pick Your Dream Bike</h1>
          <p className="py-6">
            Find new and used motorcycles for sale by owner or dealer. Buy or
            sell Harley-Davidson, Kawasaki, Suzuki, Yamaha or Honda motorcycles.
          </p>
          <button className="btn btn-primary bg-gradient-to-r from-sky-500 to-indigo-500">
            Get Started
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 p-10">
          <img
            src={img1}
            className="h-64 rounded-lg shadow-2xl hover:opacity-50 "
            alt=""
          />
          <img
            src={img2}
            className="h-64 rounded-lg shadow-2xl hover:opacity-50"
            alt=""
          />
          <img
            src={img3}
            className="h-64 rounded-lg shadow-2xl hover:opacity-50"
            alt=""
          />
          <img
            src={img4}
            className="h-64 rounded-lg shadow-2xl hover:opacity-50"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
