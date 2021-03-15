import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-ee3f7-default-rtdb.firebaseio.com/",
});

export default instance;
