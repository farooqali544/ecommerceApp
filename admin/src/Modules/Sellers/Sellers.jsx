import React, { useEffect, useState } from "react";
import styles from "./Sellers.module.css";

import CustomTable from "../shared/Table/CustomTable";
import { getAllSellers, getSpecificSellers } from "./apiSellers";
import VerifySellerForm from "./VerifySellerForm";
import { Tooltip } from "@mui/material";
import CommonTop from "../shared/CommonTop/CommonTop";
import CommonSelector from "../shared/CommonSelector/CommonSelector";

const options = ["All", "Verified", "Unverified"];

const tableHeaders = ["S.Id", "Seller Name", "Address", "Age", "Email", "Username", "Verified"];

const columnNames = ["seller_id", "full_name", "address", "age", "email", "username", "verified"];

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [verifySellerClicked, setVerifySellerClicked] = useState(false);
  const [selectedSellerType, setSelectedSellerType] = useState("All");

  useEffect(() => {
    getAllSellers(setSellers);
  }, []);

  const onChangeSellerType = (option) => {
    setSelectedSellerType(option);

    if (option === "All") return getAllSellers(setSellers);

    if (option === "Verified") return getSpecificSellers(1, setSellers);

    //Unverified
    return getSpecificSellers(0, setSellers);
  };

  const sellerTopProps = {
    title: "Sellers",
    settingsClicked: verifySellerClicked,
    setSettingsClicked: setVerifySellerClicked,
    dataLength: sellers.length,
  };

  const sellerSelectProps = {
    options: options,
    selectedItemType: selectedSellerType,
    onChangeItemType: onChangeSellerType,
  };

  return (
    <>
      {verifySellerClicked && <VerifySellerForm setVerifySellerClicked={setVerifySellerClicked} />}

      <div className={styles.container}>
        {/* Common TOP */}
        <CommonTop {...sellerTopProps} />

        {/* Common Selector */}
        <CommonSelector {...sellerSelectProps} />

        {sellers && <CustomTable rows={sellers} headers={tableHeaders} columns={columnNames} avatar='full_name' verifyButton={"verified"} />}
      </div>
    </>
  );
}

export default Sellers;
