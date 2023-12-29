import { ReactElement, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string | null>(null);
  const logout = () => {
    localStorage.removeItem("data-cleaner-user");
    setToken(null);
  };

  const saveToken = (token: string) => {
    localStorage.setItem("data-cleaner-user", token);
    setToken(token);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("data-cleaner-user");
    setToken(storedToken);
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken, logout, saveToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
