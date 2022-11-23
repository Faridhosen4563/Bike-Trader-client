import React from "react";

const CategoriesCard = ({ category }) => {
  const { name, img } = category;
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={img} alt={name} className="rounded-xl w-64 h-64" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <div className="card-actions w-full">
            <button className="btn btn-primary w-full my-4">See All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
