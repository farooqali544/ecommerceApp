import axios from "axios";

export const getAllProducts = async (sellerId, setProducts, setTempProducts) => {
  await axios
    .get(`http://localhost:8000/product/getAll/${sellerId}`)
    .then((resp) => {
      setProducts(resp.data);
      setTempProducts && setTempProducts(resp.data);
      // console.log(resp.data);
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const getSpecificProducts = async (sellerId, status, setProducts, setTempProducts) => {
  await axios
    .get(`http://localhost:8000/product/getStatusSpecificProducts/${sellerId}?status=${status}`)
    .then((resp) => {
      setProducts(resp.data);
      setTempProducts && setTempProducts(resp.data);
      // console.log(resp.data)
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const addProduct = async (postData, setProducts) => {
  return await axios
    .post("http://localhost:8000/product/add", postData)
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });
};

export const addPhotos = async (productId, postData, setProducts) => {
  return await axios
    .post(`http://localhost:8000/product/addPhotos/${productId}`, postData)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteProduct = async (productId, setProducts, setTempProducts) => {
  return await axios
    .post(`http://localhost:8000/product/deleteProduct/${productId}`)
    .then((resp) => {})
    .catch((err) => {
      throw err;
    });
};

export const bulkUpdate = async (updateData, setProducts, setTempProducts) => {
  return await axios
    .post(`http://localhost:8000/product/updateBullk/status`, updateData)
    .then((resp) => {})
    .catch((err) => {
      throw err;
    });
};

export const bulkDelete = async (deleteData, setProducts, setTempProducts) => {
  return await axios
    .post(`http://localhost:8000/product/deleteBulk`, deleteData)
    .then((resp) => {})
    .catch((err) => {
      throw err;
    });
};

export const getAllSubCategories = async (setSubCategories, reset) => {
  return await axios
    .get("http://localhost:8000/subcategory/getAll")
    .then((resp) => {
      setSubCategories(resp.data);
      reset && reset();
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};
