import axios from "../axios";

type SignupParams = {
  username: string;
  email: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};
export const signup = async (signupCredentials: SignupParams) => {
  const response = await axios.post("/signup", signupCredentials);
  return response;
};

export const login = async (loginCredentials: LoginParams) => {
  const response = await axios.post("/login", loginCredentials);
  return response;
};
