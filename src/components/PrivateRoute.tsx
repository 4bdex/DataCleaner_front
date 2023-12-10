import { ReactElement } from "react";
import { useUser } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { token } = useUser();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
