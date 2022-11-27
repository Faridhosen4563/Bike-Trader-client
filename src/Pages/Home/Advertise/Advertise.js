import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import AdvertiseItem from "./AdvertiseItem";
import Slider from "react-slick";

const Advertise = () => {
  const { data: advertises = [] } = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      const res = await fetch(
        "https://used-car-assigment-server.vercel.app/advertises"
      );
      const data = await res.json();
      return data;
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (advertises.length > 0) {
    return (
      <div className="my-20">
        <h1 className="text-center text-2xl font-semibold text-blue-400 my-6">
          Advertise
        </h1>
        <Slider {...settings}>
          {advertises.map((advertise) => (
            <AdvertiseItem
              key={advertise._id}
              advertise={advertise}
            ></AdvertiseItem>
          ))}
        </Slider>
      </div>
    );
  }
};

export default Advertise;
