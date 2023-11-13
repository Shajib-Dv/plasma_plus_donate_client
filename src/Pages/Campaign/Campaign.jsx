/** @format */
import Lottie from "lottie-react";
import Anotomology from "../../../public/Anotomology.json";
const Campaign = () => {
  return (
    <>
      <div className="w-80 mx-auto">
        <Lottie animationData={Anotomology} loop={true} />
      </div>
      <div>
        <h2 className="text-4xl text-black text-center font-bold capitalize">
          Recent <span className="base-txt">campaigns</span>
        </h2>
      </div>
    </>
  );
};

export default Campaign;
