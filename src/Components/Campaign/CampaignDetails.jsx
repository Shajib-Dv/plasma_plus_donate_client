/** @format */

import { useParams } from "react-router-dom";
import CampaignCard from "./CampaignCard";
import getSingleCampaign from "../../utils/getSingleCampaign";
import Loader from "../Loader";
import JoiningBanner from "../Home/JoiningBanner";

const CampaignDetails = () => {
  const { id } = useParams();
  const { campaign, isLoading } = getSingleCampaign(id);
  return (
    <>
      <div className="container mx-auto my-20">
        {isLoading && <Loader />}
        {campaign && Object.keys(campaign).length > 0 && (
          <CampaignCard campaign={campaign} showDetails={true} />
        )}
      </div>
      <JoiningBanner />
    </>
  );
};

export default CampaignDetails;
