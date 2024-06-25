import axios from "axios";

export const bonappetitApi = axios.create({
  baseURL: "http://3.89.55.242:8080",
});