import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL, //http://localhost:1337/
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
  },
});
