/** @format */

import Analytics from "../Pages/Admin/Analytics";
import BloodRequest from "../Pages/Admin/BloodRequest";

const adminRoutes = [
  { path: "/admin/blood_request", element: <BloodRequest /> },
  { path: "/admin/analytics", element: <Analytics /> },
];

export default adminRoutes;
