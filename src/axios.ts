import a from "axios";

const axios = a.create({
  baseURL: "http://localhost:5000",
});

export default axios;
