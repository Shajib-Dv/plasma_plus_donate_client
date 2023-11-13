/** @format */

import Lottie from "lottie-react";
import heartBit from "../../public/heart-bit.json";
import { useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  const error = useRouteError();
  const history = window.history;

  return (
    <>
      <Helmet>
        <title>Plasma_plus | Page not found</title>
      </Helmet>
      <div className="h-24 base-bg flex items-center px-10">
        <button
          onClick={() => history.back()}
          className=" btn btn-circle btn-ghost"
        >
          <FaArrowLeft className="text-white text-3xl" />
        </button>
      </div>
      <div className="lg:w-1/2 mx-auto">
        <Lottie animationData={heartBit} loop={true} />
        <div>
          <p className="text-center base-txt animate-pulse">
            <code>{error.statusText || error.message}</code>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
