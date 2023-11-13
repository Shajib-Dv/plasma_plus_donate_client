/** @format */

import { Helmet } from "react-helmet-async";
import AddDonor from "../../Components/admin/AddDonor";
import DonorsListTable from "../../Components/Donors/DonorsListTable";
import JoiningBanner from "../../Components/Home/JoiningBanner";
import { useState } from "react";
import { Collapse } from "react-collapse";

const Donors = () => {
  const [addDonor, setAddDonor] = useState(false);
  return (
    <>
      <Helmet>
        <title>Plasma_plus | Donors</title>
      </Helmet>
      <div className="h-32 base-bg rounded-b-md shadow-lg p-4 border-t">
        <h1 className="text-white text-4xl text-center font-bold">
          Register for Donation
        </h1>
        <div className="text-center my-2">
          <button
            onClick={() => setAddDonor((p) => !p)}
            className="btn base-txt capitalize"
          >
            Register now
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <Collapse isOpened={addDonor}>
          <AddDonor close={() => setAddDonor(false)} />
        </Collapse>
        <DonorsListTable />
      </div>
      <JoiningBanner />
    </>
  );
};

export default Donors;
