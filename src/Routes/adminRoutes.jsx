/** @format */

import Analytics from "../Pages/Admin/Analytics";
import BloodRequest from "../Pages/Admin/BloodRequest";
import OnlyAdmin from "./OnlyAdmin";

const adminRoutes = [
  {
    path: "/admin/blood_request",
    element: (
      <OnlyAdmin>
        <BloodRequest />
      </OnlyAdmin>
    ),
  },
  {
    path: "/admin/analytics",
    element: (
      <OnlyAdmin>
        <Analytics />
      </OnlyAdmin>
    ),
  },
];

export default adminRoutes;
