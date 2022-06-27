import axios from "axios";

export const getAllorderItems = async (sellerId, setOrders, setTempProducts) => {
  await axios
    .get(`http://localhost:8000/orderItem/getAll/${sellerId}`)
    .then((resp) => {
      setOrders(resp.data);
      // setTempProducts && setTempProducts(resp.data);
      // console.log(resp.data);
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const getSpecificOrderItems = async (sellerId, status, setOrders, setTempProducts) => {
  await axios
    .get(`http://localhost:8000/orderItem/getSpecificOrders/${sellerId}?status=${status}`)
    .then((resp) => {
      setOrders(resp.data);
      // setTempProducts && setTempProducts(resp.data);
      // console.log(resp.data);
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const changeDeliveryType = async (itemId, status) => {
  return await axios.post(`http://localhost:8000/orderItem/changeStatus/${itemId}?status=${status}`).then((resp) => resp.data);
};
