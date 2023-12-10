import { ReactElement } from "react";
import { useUser } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { token } = useUser();
  return !token ? children : <Navigate to="/" />;
};

export default PublicRoute;
