import axios from "axios";

export const getAllCategories = (setCategories) => {
    axios
      .get("http://localhost:8000/category/getAllCategories")
      .then((resp) => {
        setCategories(resp.data);
        // setLoaded(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  export const getAllSubCategories = (setSubCategories) => {
    axios
      .get("http://localhost:8000/subcategory/getAll")
      .then((resp) => {
        setSubCategories(resp.data);
        // setLoaded(true);
      })
      .catch((err) => {
        throw err;
      });
  };