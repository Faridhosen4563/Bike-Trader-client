import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../../assets/login/login.png";
import googleLogo from "../../../assets/signup/icons8-google (1).svg";
import gitHubLogo from "../../../assets/signup/icons8-github.svg";
import facebookLogo from "../../../assets/signup/icons8-facebook.svg";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { logIn, googleLogIn } = useContext(AuthContext);
  const [logInError, setLogInError] = useState("");
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form?.pathname || "/";

  const handleLogIn = (data) => {
    logIn(data.email, data.password)
      .then((result) => {
        setLogInError("");
        const user = result.user;
        console.log(user);
        navigate(form, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setLogInError(error.message);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        setLogInError("");
        toast.success("Done");
        navigate(form, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setLogInError(error.message);
      });
  };

  return (
    <div>
      <div className="hero my-20">
        <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-center items-center h-[700px]">
          <div className="text-center ">
            <img src={login} alt="Login Img" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-5xl font-bold text-center">Login now!</h1>
            <form className="card-body" onSubmit={handleSubmit(handleLogIn)}>
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
                  <Link className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
                <label className="label">
                  {logInError && (
                    <p className="alert alert-error my-2">{logInError}</p>
                  )}
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p className="text-center my-2">
                Don't have an account? Please{" "}
                <Link to="/signup" className="text-blue-400">
                  Sign Up
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
    </div>
  );
};

export default Login;
