import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signup from "../../../assets/signup/signup.png";
import googleLogo from "../../../assets/signup/icons8-google (1).svg";
import gitHubLogo from "../../../assets/signup/icons8-github.svg";
import facebookLogo from "../../../assets/signup/icons8-facebook.svg";
import { AuthContext } from "../../../contexts/AuthProvider";
import Swal from "sweetalert2";
import useToken from "../../../hooks/useToken";

const Signup = () => {
  const { createUser, updateInfo, googleLogIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userCreateEmail, setUserCreateEmail] = useState("");
  const { token } = useToken(userCreateEmail);
  if (token) {
    navigate(from, { replace: true });
  }

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
        if (imgData.success) {
          createUser(data.email, data.password)
            .then((result) => {
              setSignupError("");
              const user = result.user;
              console.log(user);
              const userInfo = {
                displayName: data.name,
                photoURL: imgData.data.url,
              };
              updateInfo(userInfo)
                .then(() => {
                  saveUser(data.name, data.email, imgData.data.url, data.type);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
              setSignupError(error.message);
            });
        }
        console.log(imgData);
      });
    console.log(data, img);
  };

  const saveUser = (name, email, img, type) => {
    const user = {
      name,
      email,
      img,
      type,
    };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setUserCreateEmail(email);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 500,
          });
        }
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        setSignupError("");
        const user = result.user;
        const type = "Buyer";
        saveUser(user.displayName, user.email, user.photoURL, type);
      })
      .catch((error) => {
        console.error(error);
        setSignupError(error.message);
      });
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
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="alert alert-error my-2">{errors.name?.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                {...register("image", { required: "Photo is required" })}
                className="file-input file-input-bordered w-full"
              />
              {errors.image && (
                <p className="alert alert-error my-2">
                  {errors.image?.message}
                </p>
              )}
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
                {...register("email", {
                  required: "Email Address is required",
                })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <p className="alert alert-error my-2">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 character or more",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$?&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "Password must have uppercase,special character,lowercase and number",
                  },
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && (
                <p className="alert alert-error my-2">
                  {errors.password?.message}
                </p>
              )}
              <label className="label">
                {signupError && (
                  <p className="alert alert-error my-2">{signupError}</p>
                )}
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="text-center my-2">
              Already have an account? Please{" "}
              <Link to="/login" className="text-blue-400">
                Log In
              </Link>
            </p>
            <div className="divider">OR</div>
            <div className="flex justify-evenly">
              <button onClick={handleGoogleLogIn}>
                <img src={googleLogo} alt="" />
              </button>
              <button>
                <img src={gitHubLogo} alt="" />
              </button>
              <button>
                <img src={facebookLogo} alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
