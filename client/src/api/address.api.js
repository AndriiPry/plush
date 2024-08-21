import axios from "axios";
import endpoints from "./endpoints";

export const getAddressApi = async (id,jwt) => {
    const callResponse = await axios({
      url: `${endpoints.getAddress}?filters[user][id]=${id}`,
      method: "GET",
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(response => response)
      .catch(err => err);
  
    return callResponse;
}

export const updateAddressApi = async (id, data, jwt) => {
  console.log("id in address", id)
    const callResponse = await axios({
      url: id ? `${endpoints.getAddress}/${id}` : `${endpoints.getAddress}`,
      method: id ? "PUT" : "POST",
      headers: {
        Authorization: "bearer " + jwt,
      },
      data
    })
      .then(response => response)
      .catch(err => err);
  
    return callResponse;
};