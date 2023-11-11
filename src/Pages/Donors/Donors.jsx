/** @format */

import { Helmet } from "react-helmet-async";
import AddDonor from "../../Components/admin/AddDonor";
import DonorsListTable from "../../Components/Donors/DonorsListTable";

const Donors = () => {
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Plasma_plus | Donors</title>
      </Helmet>
      <AddDonor />
      <DonorsListTable />
    </div>
  );
};

export default Donors;
