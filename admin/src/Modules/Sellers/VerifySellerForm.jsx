import React, { useEffect, useState } from "react";
import styles from "./Sellers.module.css";
import Backdrop from "@mui/material/Backdrop";
import { ReactComponent as CloseIcon } from "../../asset/svg/close.svg";
import { useForm } from "react-hook-form";
import { bulkUpdate, getAllSellers, getSpecificSellers } from "./apiSellers";
import avatarIcon from "../../asset/images/avatar.png";

const options = ["All", "Verified", "Unverified"];

function VerifySellerForm({ setVerifySellerClicked }) {
  const [sellers, setSellers] = useState([]);
  const [tempSellers, setTempSellers] = useState([]);
  const [editedSellers, setEditedSellers] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const updateData = editedSellers.map((item) => ({ verified: item.verified, seller_id: item.seller_id }));
    bulkUpdate(updateData, setSellers, setTempSellers);
    setEditedSellers([]);
  };

  useEffect(() => {
    getAllSellers(setSellers, setTempSellers);
  }, []);

  const onChangeSellerType = (e) => {
    if (e.target.value === "All") return getAllSellers(setSellers, setTempSellers);

    if (e.target.value === "Verified") return getSpecificSellers(1, setSellers, setTempSellers);

    //Unverified
    return getSpecificSellers(0, setSellers, setTempSellers);
  };

  const onVerifySeller = (seller) => {
    const temp = sellers.map((s) => (s.seller_id === seller.seller_id ? { ...seller, verified: 1 } : s));
    compareArrays(temp, tempSellers);
    setSellers(temp);
  };

  const onRefuteSeller = (seller) => {
    const temp = sellers.map((s) => (s.seller_id === seller.seller_id ? { ...seller, verified: 0 } : s));
    compareArrays(temp, tempSellers);
    setSellers(temp);
  };

  const compareArrays = (arr1, arr2) => {
    const result = arr1.filter(({ verified: v1, seller_id: id1 }) => !arr2.some(({ verified: v2, seller_id: id2 }) => id1 == id2 && v1 === v2));
    return setEditedSellers(result);
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={true}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>
          <h4>Verify Seller</h4>
          <span onClick={() => setVerifySellerClicked(false)}>
            <CloseIcon />
          </span>
        </div>

        <div className={styles.status}>
          <label htmlFor='status'>Sellers Type</label>
          <select onChange={onChangeSellerType}>
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sellerList}>
          {sellers.map((seller) => (
            <div className={styles.listItem}>
              <img src={avatarIcon} alt='' width={24} height={24} />
              <span className={styles.name}>{seller.full_name}</span>

              <div className={styles.manage}>
                <span className={styles.verified} id={seller.verified == 1 ? styles.verifiedActive : ""} onClick={() => onVerifySeller(seller)}>
                  verified
                </span>
                <span className={styles.refuted} id={seller.verified == 0 ? styles.refutedActive : ""} onClick={() => onRefuteSeller(seller)}>
                  Refuted
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonsContainer}>
          <button type='submit'>Submit</button>
          {editedSellers.length > 0 && (
            <button
              className={styles.discardButton}
              onClick={() => {
                setSellers(tempSellers);
                setEditedSellers([]);
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

export default VerifySellerForm;
