import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import signup from "../../../assets/signup/signup.png";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const handleLogIn = (data) => {
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
        console.log(imgData);
      });
    console.log(data, img);
  };
  return (
    <div className="hero">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-center items-center h-[1000px]">
        <div className="text-center ">
          <img src={signup} alt="Signup Img" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">Sign Up</h1>
          <form className="card-body" onSubmit={handleSubmit(handleLogIn)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Type of user?</span>
              </label>
              <select
                {...register("type")}
                className="select select-bordered w-full"
              >
                <option selected>Buyer</option>
                <option>Seller</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center my-2">
              Already have an account? Please <Link to="/login">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
