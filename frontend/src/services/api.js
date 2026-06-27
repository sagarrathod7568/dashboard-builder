import axios from "axios";

const API = axios.create({
  baseURL: "https://dashboard-builder-k1f6.onrender.com/api",
});

export const saveLayout = (data) => API.post("/save-layout.php", data);

export const getLayout = () => API.get("/get-layout.php");
