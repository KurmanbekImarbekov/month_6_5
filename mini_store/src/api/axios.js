import axios from "axios";

const mainApi = axios.create({
  baseURL: "https://shoplab-geeks.up.railway.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export { mainApi };
