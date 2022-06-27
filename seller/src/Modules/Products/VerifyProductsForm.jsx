import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import Backdrop from "@mui/material/Backdrop";
import { ReactComponent as CloseIcon } from "../../asset/svg/close.svg";
import { ReactComponent as DeleteIcon } from "../../asset/svg/delete.svg";
import { useForm } from "react-hook-form";
import { bulkUpdate, getAllProducts, getSpecificProducts, bulkDelete } from "./apiProducts";
import avatarIcon from "../../asset/images/avatar.png";
import { useAuth } from "../../utils/auth";

const options = ["All", "Verified", "Unverified"];

function VerifyProductsForm({ setVerifyProductClicked, setProducts: setParentProducts }) {
  const [products, setProducts] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState(false);
  const [toDeleteProducts, setToDeleteProducts] = useState([]);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (editedProducts.length > 0) {
      const updateData = editedProducts.map((item) => ({ status: item.status, product_id: item.product_id }));
      await bulkUpdate(updateData, setProducts, setTempProducts);
      setEditedProducts([]);
    }

    if (toDeleteProducts.length > 0) {
      const deleteData = toDeleteProducts.map((item) => ({ product_id: item }));
      await bulkDelete(deleteData, setProducts, setTempProducts);
      setToDeleteProducts([]);
    }

    // parentProducts = Products in Products.jsx
    await getAllProducts(user.id, setParentProducts);
    getAllProducts(user.id, setProducts, setTempProducts);
  };

  useEffect(() => {
    getAllProducts(user.id, setProducts, setTempProducts);
  }, []);

  const onChangeProductType = (e) => {
    if (e.target.value === "All") return getAllProducts(user.id, setProducts, setTempProducts);

    if (e.target.value === "Verified") return getSpecificProducts(user.id, 1, setProducts, setTempProducts);

    //Unverified
    return getSpecificProducts(user.id, 0, setProducts, setTempProducts);
  };

  const onVerifyProduct = (product) => {
    const temp = products.map((s) => (s.product_id === product.product_id ? { ...product, status: 1 } : s));
    compareArrays(temp, tempProducts);
    setProducts(temp);
  };

  const onRefuteProduct = (product) => {
    const temp = products.map((s) => (s.product_id === product.product_id ? { ...product, status: 0 } : s));
    compareArrays(temp, tempProducts);
    setProducts(temp);
  };

  const compareArrays = (arr1, arr2) => {
    const result = arr1.filter(({ status: v1, product_id: id1 }) => !arr2.some(({ status: v2, product_id: id2 }) => id1 == id2 && v1 === v2));
    return setEditedProducts(result);
  };

  const onDeleteProduct = (id) => {
    if (!toDeleteProducts.includes(id)) return setToDeleteProducts((prevProducts) => [...prevProducts, id]);

    const temp = toDeleteProducts.filter((item) => item !== id);
    setToDeleteProducts(temp);
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={true}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>
          <h4>Verify product</h4>
          <span onClick={() => setVerifyProductClicked(false)}>
            <CloseIcon />
          </span>
        </div>

        <div className={styles.status}>
          <label htmlFor='status'>products Type</label>
          <select onChange={onChangeProductType}>
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sellerList}>
          {products.map((product) => (
            <div className={styles.listItem}>
              <img src={product.thumbnail} alt='' width={30} height={30} />
              <span className={styles.name}>{product.product_name}</span>

              <div className={styles.manage}>
                <span className={styles.verified} id={product.status == 1 ? styles.verifiedActive : ""} onClick={() => onVerifyProduct(product)}>
                  Active
                </span>
                <span className={styles.refuted} id={product.status == 0 ? styles.refutedActive : ""} onClick={() => onRefuteProduct(product)}>
                  Inactive
                </span>

                <span className={styles.deleteIcon} onClick={() => onDeleteProduct(product.product_id)}>
                  {toDeleteProducts.includes(product.product_id) ? "undo" : <DeleteIcon width={24} height={24} />}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonsContainer}>
          <button type='submit'>Submit</button>

          {(editedProducts.length > 0 || toDeleteProducts.length > 0) && (
            <button
              className={styles.discardButton}
              onClick={() => {
                setProducts(tempProducts);
                setEditedProducts([]);
                setToDeleteProducts([]);
              }}
            >
              Discard
            </button>
          )}
        </div>
      </form>
    </Backdrop>
  );
}

export default VerifyProductsForm;
