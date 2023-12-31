import { ReactElement, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Spinner } from "@chakra-ui/react";

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const logout = () => {
    localStorage.removeItem("data-cleaner-user");
    setToken(null);
  };

  const saveToken = (token: string) => {
    localStorage.setItem("data-cleaner-user", token);
    setToken(token);
  };
  useEffect(() => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("data-cleaner-user");
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken, logout, saveToken }}>
      {isLoading ? <Spinner /> : children}
    </UserContext.Provider>
  );
};

export default UserProvider;
