import { AxiosError } from "axios";

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    // Inside this block, err is known to be a ValidationError
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data.message;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);

      return "No response from server";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      return "Request has not been made, the server is down or you lost connection";
    }
  } else {
    console.log(error);
  }
};

export default getErrorMessage;
