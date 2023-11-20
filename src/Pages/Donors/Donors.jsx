/** @format */

import { Helmet } from "react-helmet-async";
import AddDonor from "../../Components/admin/AddDonor";
import DonorsListTable from "../../Components/Donors/DonorsListTable";
import JoiningBanner from "../../Components/Home/JoiningBanner";
import { useState } from "react";
import { Collapse } from "react-collapse";
import useCurrentUser from "../../hooks/useCurrentUser";

const Donors = () => {
  const [addDonor, setAddDonor] = useState(false);
  const { role } = useCurrentUser();
  return (
    <>
      <Helmet>
        <title>Plasma_plus | Donors</title>
      </Helmet>

      <div className="container mx-auto">
        {role === "admin" && (
          <>
            <div className="text-center my-2">
              <button
                onClick={() => setAddDonor((p) => !p)}
                className="btn base-txt capitalize"
              >
                Add new donor
              </button>
            </div>
            <Collapse isOpened={addDonor}>
              <AddDonor close={() => setAddDonor(false)} />
            </Collapse>
          </>
        )}
        <DonorsListTable />
      </div>
      <JoiningBanner />
    </>
  );
};

export default Donors;
