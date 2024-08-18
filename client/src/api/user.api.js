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

  export const updateUserApi = async (id, data, jwt) => {
    const callResponse = await axios({
      url: `${endpoints.updateUser}/${id}`,
      method: "PUT",
      headers: {
        Authorization: "bearer " + jwt,
      },
      data
    })
      .then(response => response)
      .catch(err => err);
  
    return callResponse;
  };

  export const sendConfirmEmailApi = async data => {
    const callResponse = await axios({
      url: endpoints.confirmationEmail,
      method: "POST",
      data,
    })
      .then(response => response)
      .catch(err => err);
  
    return callResponse;
  };