import axios from "axios";

export const getOneProduct = (productId, setProduct) => {
  axios
    .get(`http://localhost:8000/product/getOneProduct/${productId}`)
    .then((resp) => {
      setProduct(resp.data);
    })
    .catch((err) => {
      throw err;
    });
};

export const addCartItem = async (postData) => {
  return await axios
    .post(`http://localhost:8000/cartitem/add`, postData)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateItemQuantity = async (postData) => {
  return await axios
    .post(`http://localhost:8000/cartitem/updateQuantity`, postData)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      throw err;
    });
};
