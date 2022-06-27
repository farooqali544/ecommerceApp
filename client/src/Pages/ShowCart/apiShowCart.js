import axios from "axios";

export const getCartItemsWithData = async (cartId, setCartItems) => {
  await axios
    .get(`http://localhost:8000/cartitem/getCartItemsWithData/${cartId}`)
    .then((resp) => {
      setCartItems(resp.data);
    })
    .catch((err) => {
      throw err;
    });
};

export const checkOutOrder = async (postData) => {
  await axios
    .post(`http://localhost:8000/order/add`, postData)
    .then((resp) => {
      console.log(resp.data);
      return resp;
      // setCartItems(resp.data);
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCartItems = async (postData) => {
  await axios
    .post(`http://localhost:8000/cartitem/delete`, postData)
    .then((resp) => {
      return resp;
      // setCartItems(resp.data);
    })
    .catch((err) => {
      throw err;
    });
};
