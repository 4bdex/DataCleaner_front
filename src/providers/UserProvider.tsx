import { ReactElement, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string | null>(null);
  const logout = () => {
    setToken(null);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("data cleaner user");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("data cleaner user", token);
  }, [token]);
  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
