import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.coincap.io/v2/`,
  headers: {
    "Accept": 'application/json, text/plain, */*',
    "content-type": "application/json",
    "authorization": "Bearer " + process.env.API_KEY,

  },
});
export default instance;
