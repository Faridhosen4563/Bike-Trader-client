import React from "react";
import person1 from "../../../assets/person/person-1.jpg";
import person2 from "../../../assets/person/person-2.jpg";
import { MdFormatQuote } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-xl font-semibold text-blue-400 my-2">
          Testimonial
        </h1>
        <p className="text-3xl font-bold  my-2">What Our Customer Says</p>
        <p className="w-1/2 mx-auto">
          Bike is love.Never fear, because eBay lets you browse every type of
          motorcycle for sale from used dirt bikes to classic Harley-Davidsons
          to high-end BMW Motorcycles
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 my-12">
        <div className="border border-b-stone-400 rounded-xl p-6">
          <div className="flex justify-around">
            <div className="flex items-center justify-center">
              <img
                src={person1}
                alt="person-1"
                className="w-16 h-16 border-2 border-blue-400 rounded-full"
              />
              <div className="ml-4">
                <p className="text-xl font-bold">Tanvir Ahmed</p>
                <p className="text-lg font-medium">Rajshahi</p>
              </div>
            </div>
            <MdFormatQuote className="h-24 w-24 text-blue-400"></MdFormatQuote>
          </div>
          <div className="p-10">
            <p>
              Appropriately repurpose user friendly models rather than
              multifunctional networks. Compellingly revolutionize team driven
              strategic theme areas for cross-unit paradigms. Phosfluorescently
              harness team driven users for.
            </p>
            <p className="flex text-yellow-500 my-6">
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
            </p>
          </div>
        </div>
        <div className="border border-b-stone-400 p-6 rounded-xl">
          <div className="flex justify-around">
            <div className="flex items-center justify-center">
              <img
                src={person2}
                alt="person-2"
                className="w-16 h-16 border-2 border-blue-400 rounded-full"
              />
              <div className="ml-4">
                <p className="text-xl font-bold">Tusar Ahmed</p>
                <p className="text-lg font-medium">Dhaka</p>
              </div>
            </div>
            <MdFormatQuote className="h-24 w-24 text-blue-400"></MdFormatQuote>
          </div>
          <div className="p-10">
            <p>
              Appropriately repurpose user friendly models rather than
              multifunctional networks. Compellingly revolutionize team driven
              strategic theme areas for cross-unit paradigms. Phosfluorescently
              harness team driven users for.
            </p>
            <p className="flex text-yellow-500 my-6">
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
              <FaStar className="ml-2"></FaStar>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
