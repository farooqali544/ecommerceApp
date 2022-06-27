import axios from "axios";

export const getOneProduct = (productId, setProduct) => {
  axios
    .get(`http://localhost:8000/product/getOneProduct/${productId}`)
    .then((resp) => {
      console.log(resp.data);
      setProduct(resp.data);
    })
    .catch((err) => {
      throw err;
    });
};
