import axios from "axios";

export const getAllProducts = async (subCategoryId, setProducts, setTempProducts) => {
  await axios
    .get(`http://localhost:8000/product/getProductsFromSubCategory/${subCategoryId}`)
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
