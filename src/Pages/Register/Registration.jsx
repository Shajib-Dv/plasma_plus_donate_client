/** @format */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fromData, setFromData] = useState({});
  const navigate = useNavigate();
  const { createUserWithGoogle } = useAuth();

  const { name, email, password } = fromData;

  const storeUserInDB = async (userInfo) => {
    const res = await fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    return res;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (error) {
      setLoading(false);
      return;
    }

    const userInfo = { name, email, date: new Date() };

    await storeUserInDB(userInfo).then((res) => {
      if (res.ok) {
        createUserWithGoogle(email, password)
          .then(() => {
            setLoading(false);
            navigate("/");
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }
    });
  };

  useEffect(() => {
    setError("");

    password?.length < 6 && setError("Password must be at least 6 characters");

    if (!password) {
      return setError("");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Please insert an uppercase letter!");
    }

    if (!/\d/.test(password)) {
      return setError("Please insert a number!");
    }

    if (!/[@$!%*?&]/.test(password)) {
      return setError("Please insert a special character!");
    }
  }, [password]);

  const handleFromDataState = (name, val) => {
    setFromData((pv) => {
      return { ...pv, [name]: val };
    });
  };

  return (
    <>
      <Helmet>
        <title>Plasma_plus | Registration</title>
      </Helmet>
      <div className="lg:w-2/5 mx-auto h-mx p-10 border my-20 rounded-lg shadow-md">
        <div className="h-24 base-bg rounded-t-lg center-itm">
          <h2 className="text-white text-2xl font-bold capitalize">
            Register for get More Services.
          </h2>
        </div>
        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Your Name</span>
            </label>
            <input
              type="text"
              className="input-file"
              placeholder="Enter your name here.."
              required={true}
              onChange={(e) => handleFromDataState("name", e.target.value)}
            />
          </div>
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
                "Register"
              )}
            </button>
          </div>
          <div className="text-center">
            <p className="text-black font-semibold">
              Already have an account ! please{" "}
              <span className="base-txt link">
                <Link to={"/login"}>Log in</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
