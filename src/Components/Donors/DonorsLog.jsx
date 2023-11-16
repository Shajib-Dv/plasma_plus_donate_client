/** @format */

import { useParams } from "react-router-dom";
import getDonationLog from "../../utils/getDonationLog";
import Loader from "../Loader";
import DonationLogHistory from "./DonationLogHistory";
import { useState } from "react";
import EmptyData from "../EmptyData";

const DonorsLog = () => {
  const [open, setOpen] = useState(0);
  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }

    setOpen(index);
  };
  const { id } = useParams();
  const { donationLog, isLoading } = getDonationLog(id);
  const donor = donationLog?.donor || {};
  const { _id, name, donorImg, ...prevLog } = donor;
  const prevKey = Object.keys(prevLog) || [];
  const donations = donationLog?.donations || [];

  return (
    <>
      {name && (
        <div className="h-24 base-bg center-itm">
          <h2 className="text-4xl text-white font-bold">
            Donation Log of <code>~~{name}~~</code>
          </h2>
        </div>
      )}
      {isLoading && <Loader />}

      {Object.keys(donor).length === 0 && !isLoading ? (
        <div className="h-80">
          <EmptyData
            reason={"You have to donation log to show"}
            message={"donate someone and visit later"}
            go={"Donate now"}
            to={"/donors"}
          />
        </div>
      ) : (
        <div className="container mx-auto my-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex lg:flex-row flex-col items-center justify-between">
              <div>
                <div className="w-40 h-40 rounded-full overflow-hidden">
                  <img
                    src={donorImg}
                    alt="donor"
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
              <div className="w-full p-4">
                {prevKey.map((key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-y border-opacity-20 p-1"
                  >
                    <div className="flex-1">
                      <p className="capitalize">{key}:</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-left ">{prevLog[key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {donations.length > 0 ? (
              <div>
                <div>
                  <h2 className="text-2xl font-bold base-txt">
                    {donations.length} Donation log found
                  </h2>
                </div>
                {donations.map((donation, idx) => (
                  <DonationLogHistory
                    key={donation._id}
                    toggle={() => toggle(idx)}
                    data={donation}
                    open={idx === open}
                  />
                ))}
              </div>
            ) : (
              !isLoading && (
                <div>
                  <EmptyData
                    message={"No donation log found"}
                    reason={"this donar has no donate yet !"}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DonorsLog;
