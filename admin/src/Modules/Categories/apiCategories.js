import axios from "axios";

export const insertCategories =async (postData, setLoaded) => {
  await axios
    .post("http://localhost:8000/category/addCategory", postData)
    .then((resp) => {
      //   setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllCategories = async (setCategories) => {
  await axios
    .get("http://localhost:8000/category/getAllCategories")
    .then((resp) => {
      setCategories(resp.data);
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const getSpecificCategories = (status, setCategories) => {
  axios
    .get(`http://localhost:8000/category/getStatusSpecificCategories?status=${status}`)
    .then((resp) => {
      setCategories(resp.data);
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};
