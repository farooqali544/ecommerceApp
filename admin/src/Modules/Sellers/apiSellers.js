import axios from "axios";

export const getAllSellers = (setSellers, setTempSellers) => {
  axios
    .get("http://localhost:8000/seller/all")
    .then((resp) => {
      setSellers(resp.data);
      setTempSellers && setTempSellers(resp.data);
      // console.log(resp.data);
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const getSpecificSellers = (status, setSellers, setTempSellers) => {
  axios
    .get(`http://localhost:8000/seller/getStatusSpecificSellers?status=${status}`)
    .then((resp) => {
      setSellers(resp.data);
      setTempSellers && setTempSellers(resp.data);
      // console.log(resp.data)
      // setLoaded(true);
    })
    .catch((err) => {
      throw err;
    });
};

export const bulkUpdate = (updateData, setSellers, setTempSellers) => {
  axios
    .post(`http://localhost:8000/seller/updateBullk/status`, updateData)
    .then((resp) => {
      getAllSellers(setSellers, setTempSellers);
    })
    .catch((err) => {
      throw err;
    });
};
