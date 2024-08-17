import axios from "axios";
import endpoints from "./endpoints";

export const addUserApi = async data => {
    const callResponse = await axios({
      url: endpoints.registerUser,
      method: "POST",
      data,
    })
      .then(response => response)
      .catch(err => err);
  
    return callResponse;
  };