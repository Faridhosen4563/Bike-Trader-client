import React from "react";
import useTitle from "../../../hooks/useTitle";
import Advertise from "../Advertise/Advertise";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  useTitle("Home");
  return (
    <div className="mx-5 my-12">
      <Banner></Banner>
      <Advertise></Advertise>
      <Categories></Categories>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
