/** @format */

import Analytics from "../Pages/Admin/Analytics";
import BloodRequest from "../Pages/Admin/BloodRequest";
import ManageDonation from "../Pages/Admin/ManageDonation";

const adminRoutes = [
  { path: "/admin/manage_donation", element: <ManageDonation /> },
  { path: "/admin/blood_request", element: <BloodRequest /> },
  { path: "/admin/analytics", element: <Analytics /> },
];

export default adminRoutes;
