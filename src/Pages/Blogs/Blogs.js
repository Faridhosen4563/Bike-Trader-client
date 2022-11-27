import { useQuery } from "@tanstack/react-query";
import React from "react";
import BlogItem from "./BlogItem";

const Blogs = () => {
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/blogs");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="mx-5 my-12">
      <h1 className="text-center text-2xl font-bold text-blue-400">
        Welcome to my Blogs
      </h1>
      <div className="mt-12 mb-20 md:my-12">
        {blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog}></BlogItem>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
