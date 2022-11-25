import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    axios.get("http://localhost:5000/category").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleAdd = (data) => {
    const img = data.image[0];
    const formData = new FormData();
    formData.append("image", img);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const bikeData = {
            name: user?.displayName,
            email: data.email,
            Bike: data.bike,
            price: data.price,
            location: data.location,
            Running: data.running,
            category: data.category,
            Condition: data.condition,
            phone: data.phone,
            uses: `${data.year} years`,
            Description: data.description,
            date: currentDate,
            img: imgData.data.url,
          };

          fetch("http://localhost:5000/bikes", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(bikeData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Added a product successfully");
                navigate("/dashboard/myporducts");
              }
            });
        }
      });
  };

  return (
    <div className=" my-8 w-11/12 md:w-96 mx-auto">
      <h1>Add a product</h1>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Bike Model</span>
          </label>
          <input
            {...register("bike", { required: "Bike Model is required" })}
            type="text"
            className="input input-bordered w-full "
          />
          {errors.bike && (
            <p className="alert alert-error my-2">{errors.bike?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: "Email Address is required" })}
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full "
          />
          {errors.email && (
            <p className="alert alert-error my-2">{errors.email?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            {...register("price", { required: "Price is required" })}
            type="text"
            className="input input-bordered w-full "
          />
          {errors.price && (
            <p className="alert alert-error my-2">{errors.price?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Total Running (km)</span>
          </label>
          <input
            {...register("running", { required: "Year is required" })}
            type="text"
            className="input input-bordered w-full "
          />
          {errors.running && (
            <p className="alert alert-error my-2">{errors.running?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            {...register("location", { required: "Location is required" })}
            type="text"
            className="input input-bordered w-full "
          />
          {errors.location && (
            <p className="alert alert-error my-2">{errors.location?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Year of uses</span>
          </label>
          <select
            {...register("year")}
            className="select select-bordered w-full"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          {errors.year && (
            <p className="alert alert-error my-2">{errors.year?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            type="number"
            className="input input-bordered w-full "
          />
          {errors.phone && (
            <p className="alert alert-error my-2">{errors.phone?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Condition</span>
          </label>
          <select
            {...register("condition")}
            className="select select-bordered w-full"
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
          {errors.condition && (
            <p className="alert alert-error my-2">
              {errors.condition?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">category</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="alert alert-error my-2">{errors.category?.message}</p>
          )}
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Photo is required" })}
            className="file-input w-full max-w-xs"
          />
          {errors.image && (
            <p className="alert alert-error my-2">{errors.image?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Write about your bike"
          ></textarea>
          {errors.description && (
            <p className="alert alert-error my-2">
              {errors.description?.message}
            </p>
          )}
        </div>
        <input
          type="submit"
          value="Add A Product"
          className="btn btn-accent w-full my-4"
        />
      </form>
    </div>
  );
};

export default AddProduct;
