import axios from "axios";

const API = axios.create({
  baseURL: "",
});

export const saveLayout = (data) => API.post("/save-layout.php", data);

export const getLayout = () => API.get("/get-layout.php");
