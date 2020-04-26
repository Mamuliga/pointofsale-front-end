const devApiUrl = "http://localhost:3300/api/";
const prodApiUrl = "https://eit-pos-api.herokuapp.com/api/";

export default {
  apiUrl: process.env.NODE_ENV === "production" ? prodApiUrl : devApiUrl,
  ...process.env
};
