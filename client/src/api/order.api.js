import axios from "axios";
import endpoints from "./endpoints";

export const getUsersOrder = async (id,jwt) => {
    const callResponse = await axios({
      url: `${endpoints.getOrder}?filters[user][id]=${id}`,
      method: "GET",
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(response => response)
      .catch(err => err);
  
    return callResponse;
}
