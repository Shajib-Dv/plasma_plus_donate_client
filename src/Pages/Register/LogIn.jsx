/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fromData, setFromData] = useState({});
  const navigate = useNavigate();
  const { logInUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = fromData;

    logInUser(email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleFromDataState = (name, val) => {
    setFromData((pv) => {
      return { ...pv, [name]: val };
    });
  };

  return (
    <div className="lg:w-2/5 mx-auto h-mx p-10 border my-20 rounded-lg shadow-md">
      <div className="h-24 base-bg rounded-t-lg center-itm">
        <h2 className="text-white text-2xl font-bold capitalize">
          welcome back. please login
        </h2>
      </div>
      <form onSubmit={handleLogin} className="space-y-4 mt-6">
        <div>
          <label className="label">
            <span className="label-text font-semibold">Your Email</span>
          </label>
          <input
            type="email"
            className="input-file"
            placeholder="Enter your email here.."
            required={true}
            onChange={(e) => handleFromDataState("email", e.target.value)}
          />
        </div>
        <div className="relative">
          <label className="label">
            <span className="label-text font-semibold">Your Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="input-file"
            placeholder="*********"
            required={true}
            onChange={(e) => handleFromDataState("password", e.target.value)}
          />
          <span
            onClick={() => setShowPassword((pv) => !pv)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer base-txt text-xl"
          >
            {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
          </span>
          <label className="label h-6">
            <span className="label-text font-semibold base-txt">
              {error && error}
            </span>
          </label>
        </div>
        <div className="text-center">
          <button disabled={loading} type="submit" className="btn-base w-40">
            {loading ? (
              <span className="loading loading-dots loading-sm base-txt"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <div className="text-center">
          <p className="text-black font-semibold">
            Don&apos;t have any account ! please{" "}
            <span className="base-txt link">
              <Link to={"/registration"}>Register</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
