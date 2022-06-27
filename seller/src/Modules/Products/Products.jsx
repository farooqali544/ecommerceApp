import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

import CustomTable from "../shared/Table/CustomTable";

import VerifyProductsForm from "./VerifyProductsForm";
import { Tooltip } from "@mui/material";
import CommonTop from "../shared/CommonTop/CommonTop";
import CommonSelector from "../shared/CommonSelector/CommonSelector";
import { getAllProducts, getSpecificProducts } from "./apiProducts";
import AddProductForm from "./AddProductForm";
import ShowProduct from "../ShowProduct/ShowProduct";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

const options = ["All", "Verified", "Unverified"];

const tableHeaders = ["P.Id", "Product Name", "Sub Category", "Unit Price", "Color", "In Stock", "Status"];

const columnNames = ["product_id", "product_name", "sub_category_name", "unit_price", "color", "units_in_stock", "status"];

function Products() {
  const [products, setProducts] = useState([]);
  const [verifyProductClicked, setVerifyProductClicked] = useState(false);
  const [addProductClicked, setAddProductClicked] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState("All");

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts(user.id, setProducts);
  }, []);

  const onChangeProductType = (option) => {
    setSelectedProductType(option);

    if (option === "All") return getAllProducts(user.id, setProducts);

    if (option === "Verified") return getSpecificProducts(user.id, 1, setProducts);

    //Unverified
    return getSpecificProducts(user.id, 0, setProducts);
  };

  const onAddProduct = () => setAddProductClicked(!addProductClicked);

  const onRefreshData = () => {
    onChangeProductType(selectedProductType);
  };

  const topProps = {
    title: "Products",
    settingsClicked: verifyProductClicked,
    setSettingsClicked: setVerifyProductClicked,
    onClickAddButton: onAddProduct,
    dataLength: products.length,
    onRefresh: onRefreshData,
  };

  const selectProps = {
    options: options,
    selectedItemType: selectedProductType,
    onChangeItemType: onChangeProductType,
  };

  const onClickRow = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {verifyProductClicked && <VerifyProductsForm setVerifyProductClicked={setVerifyProductClicked} setProducts={setProducts} />}

      {addProductClicked && <AddProductForm setAddProductClicked={setAddProductClicked} setProducts={setProducts} />}

      <div className={styles.container}>
        {/* Common TOP */}
        <CommonTop {...topProps} />

        {/* Common Selector */}
        <CommonSelector {...selectProps} />

        {products && (
          <CustomTable
            rows={products}
            headers={tableHeaders}
            columns={columnNames}
            avatarColumnName='product_name'
            photo='thumbnail'
            verifyButton={"status"}
            clickableRow={{ itemId: "product_id" }}
            onClickRow={onClickRow}
            colorColumn={"color"}
          />
        )}
      </div>
    </>
  );
}

export default Products;
