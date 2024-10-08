import axios from "axios";

import endpoints from "./endpoints";

export const signInApi = async data => {
  const callResponse = await axios({
    url: endpoints.signIn,
    method: "post",
    data,
  })
    .then(response => response.data)
    .catch(err => (err.response ? err.response.data : {}));
  return callResponse;
};

export const sendResetPasswordEmailApi = async (data) => {
  const callResponse = await axios({
    url: endpoints.sendEmail,
    method: "POST",
    data,
  })
    .then(response => response)
    .catch(err => err);
  return callResponse;
}