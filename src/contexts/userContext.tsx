import { Dispatch, SetStateAction, createContext, useContext } from "react";

type TUserContext = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export const UserContext = createContext<TUserContext | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "The component using useUser must wrapped within UserContextProvider"
    );
  }
  return context;
};
