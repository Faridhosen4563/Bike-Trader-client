import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoriesCard from "./CategoriesCard";

const Categories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        "https://used-car-assigment-server.vercel.app/categories"
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="my-20">
      <div className="text-center">
        <h1 className="text-4xl font-semibold my-2">Product Categories</h1>
        <p>Second hand bike categories. Here you found your dream bike. </p>
      </div>
      <div className="grid gap-6 my-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoriesCard
            key={category._id}
            category={category}
          ></CategoriesCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;
