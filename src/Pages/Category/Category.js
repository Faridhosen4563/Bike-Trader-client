import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../components/Spinner";
import useTitle from "../../hooks/useTitle";
import CategoriesCard from "../Home/Categories/CategoriesCard";

const Category = () => {
  useTitle("Category");
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        "https://used-car-assigment-server.vercel.app/categories"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid gap-6 my-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoriesCard key={category._id} category={category}></CategoriesCard>
      ))}
    </div>
  );
};

export default Category;
