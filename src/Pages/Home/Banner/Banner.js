import React from "react";
import img1 from "../../../assets/Banner/img1.jpg";
import img2 from "../../../assets/Banner/img2.jpg";
import img3 from "../../../assets/Banner/img3.jpg";
import img4 from "../../../assets/Banner/img4.jpg";
import img5 from "../../../assets/Banner/img5.jpg";

const Banner = () => {
  return (
    <div>
      <div className="carousel w-full h-[80vh]">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={img1} className="w-full" alt="bike-banner" />
          <div className="absolute  transform translate-y-1/2 left-5 right-5 top-1/4 md:ml-32">
            <p className="text-white font-medium text-xl">Long Ride</p>
          </div>
          <div className="absolute  transform translate-y-1/2 left-5 right-5 top-1/3 md:ml-32">
            <p className="text-white uppercase text-5xl font-extrabold">
              Racing is Life
            </p>
          </div>
          <div className="absolute  transform translate-y-1/2 left-5 right-5 top-1/3 md:ml-32">
            <p className="text-white">Racing is Life</p>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
