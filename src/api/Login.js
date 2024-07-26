import axios from "@/utils/request.js";

export const login = (data) =>
  axios({
    url: "login",
    method: "post",
    data,
  });
