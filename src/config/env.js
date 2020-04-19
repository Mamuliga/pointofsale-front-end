const devApiUrl = "http://eit-pos-api.herokuapp.com/api/";
const prodApiUrl = "https://eit-pos-api.herokuapp.com/api/";

export default {
  apiUrl: process.env === "production" ? prodApiUrl : devApiUrl,
  ...process.env
};
