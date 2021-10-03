import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-32a3a.cloudfunctions.net/api",
  // "http://localhost:5001/clone-32a3a/us-central1/api",
});

export default instance;
