/** @format */
import Lottie from "lottie-react";
import Anotomology from "../../../public/Anotomology.json";
import AddCampaign from "../../Components/Campaign/AddCampaign";
import { useState } from "react";
import { Collapse } from "react-collapse";
import useCurrentUser from "../../hooks/useCurrentUser";
import CampaignCard from "../../Components/Campaign/CampaignCard";
import getCampaigns from "../../utils/getCampaigns";
import Loader from "../../Components/Loader";
import JoiningBanner from "../../Components/Home/JoiningBanner";
const Campaign = () => {
  const [isCollaps, setIsCollaps] = useState(false);
  const { role } = useCurrentUser();
  const { campaigns, isLoading, refetch } = getCampaigns();
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
              <AddCampaign
                close={() => setIsCollaps(false)}
                refetch={refetch}
              />
            </Collapse>
          </div>
        </>
      )}

      {isLoading && <Loader />}

      {campaigns && Array.isArray(campaigns) && campaigns.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 mb-40">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
              role={role}
              refetch={refetch}
            />
          ))}
        </div>
      )}

      <JoiningBanner />
    </>
  );
};

export default Campaign;
