/** @format */
import Lottie from "lottie-react";
import Anotomology from "../../../public/Anotomology.json";
import AddCampaign from "../../Components/Campaign/AddCampaign";
import { useState } from "react";
import { Collapse } from "react-collapse";
import useCurrentUser from "../../hooks/useCurrentUser";
const Campaign = () => {
  const [isCollaps, setIsCollaps] = useState(false);
  const { role } = useCurrentUser();
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
      {role === "admin" && (
        <>
          <div className="text-center my-10">
            <button
              onClick={() => setIsCollaps((p) => !p)}
              className="btn-base w-40"
            >
              Add Campaigns
            </button>
          </div>
          <div>
            <Collapse isOpened={isCollaps}>
              <AddCampaign close={() => setIsCollaps(false)} />
            </Collapse>
          </div>
        </>
      )}

      <div></div>
    </>
  );
};

export default Campaign;
