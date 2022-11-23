import React from "react";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  return (
    <div className="mx-5">
      <h2>This is home</h2>
      <Banner></Banner>
      <Categories></Categories>
    </div>
  );
};

export default Home;
