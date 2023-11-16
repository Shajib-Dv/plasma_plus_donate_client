/** @format */

import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";
import useAuth from "../hooks/useAuth";
import useCurrentUser from "../hooks/useCurrentUser";

const OnlyAdmin = ({ children }) => {
  const { loading } = useAuth();
  const { role } = useCurrentUser();

  if (loading || !role) {
    return <Loader />;
  }

  if (role === "admin") {
    return children;
  }

  return <Navigate to={"/"} replace={true} />;
};

export default OnlyAdmin;
