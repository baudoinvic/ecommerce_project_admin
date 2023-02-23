import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// let TOKEN = ""
//  console.log(JSON.parse(localStorage.getItem("persist:root")))
// if (JSON.parse(localStorage.getItem("persist:root")) !== null){
//   TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken;
// }


// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });
