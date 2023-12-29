import { ReactElement } from "react";
import { useUser } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { token } = useUser();
  console.log("token in public route", token);

  return !token ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
