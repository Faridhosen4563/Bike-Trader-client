import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../../assets/login/login.png";
import googleLogo from "../../../assets/signup/icons8-google (1).svg";
import gitHubLogo from "../../../assets/signup/icons8-github.svg";
import facebookLogo from "../../../assets/signup/icons8-facebook.svg";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import useToken from "../../../hooks/useToken";
import useTitle from "../../../hooks/useTitle";
import LoadingSpinner from "../../Sheared/LoadingSpiner";

const Login = () => {
  useTitle("Log In");
  const { logIn, googleLogIn } = useContext(AuthContext);
  const [logInError, setLogInError] = useState("");
  const [process, setProcess] = useState(false);
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [logInEmail, setLogInEmail] = useState("");
  const { token } = useToken(logInEmail);
  // if (token) {
  //   navigate(from, { replace: true });
  // }

  const handleLogIn = (data) => {
    setProcess(true);
    logIn(data.email, data.password)
      .then((result) => {
        setLogInError("");
        const user = result.user;
        accessToken(data.email);
        setProcess(false);
        toast.success("Log in successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setLogInError(error.message);
        setProcess(false);
      });
  };

  const handleGoogleLogIn = () => {
    setProcess(true);
    googleLogIn()
      .then((result) => {
        const user = result.user;
        setLogInError("");
        accessToken(user?.email);
        toast.success("Log in successful");
        setProcess(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setLogInError(error.message);
        setProcess(false);
      });
  };

  const handleSocial = () => {
    toast.success("Coming soon. Please try Google or Email/password");
  };

  const accessToken = (email) => {
    fetch(`https://used-car-assigment-server.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("bikeTraderToken", data.token);
        }
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
                  {process ? <LoadingSpinner></LoadingSpinner> : "Login"}
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
                <button onClick={handleSocial}>
                  <img src={gitHubLogo} alt="" />
                </button>
                <button onClick={handleSocial}>
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
