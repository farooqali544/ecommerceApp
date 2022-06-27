import axios from "axios";

export const addSeller = (postData, setLoaded) => {
  console.log(postData);
  axios
    .post("http://localhost:8000/seller/add", postData)
    .then((resp) => {
      //   setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const verifyEmail = (postData, setLoaded) => {
  return axios
    .post("http://localhost:8000/seller/verifyemail", postData)
    .then((resp) => (resp.data.emailFound === 0 ? true : false))
    .catch((err) => {
      throw err;
    });
};

export const verifyUsername = (postData, setLoaded) => {
  return axios
    .post("http://localhost:8000/seller/verifyusername", postData)
    .then((resp) => (resp.data.userFound === 0 ? true : false))
    .catch((err) => {
      throw err;
    });
};

export const loginSeller = (postData, auth, setLoaded) => {
  return axios
    .post("http://localhost:8000/seller/login", postData)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      const { error, errorCode } = err.response.data;
      if (errorCode) return { error, errorCode };

      throw err;
    });
};
