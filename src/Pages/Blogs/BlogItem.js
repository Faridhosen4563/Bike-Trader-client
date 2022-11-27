import React from "react";
import { FaQuestion } from "react-icons/fa";

const BlogItem = ({ blog }) => {
  return (
    <div>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-2"
      >
        <div className="collapse-title text-xl font-medium">
          <p className="flex items-center">
            <FaQuestion className="ml-4"></FaQuestion>
            {blog.Question}
          </p>
        </div>
        <div className="collapse-content">
          <p>{blog.Answer}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
