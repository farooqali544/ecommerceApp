import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";

import CustomTable from "../shared/Table/CustomTable";

import CommonTop from "../shared/CommonTop/CommonTop";
import CommonSelector from "../shared/CommonSelector/CommonSelector";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { changeDeliveryType, getAllorderItems, getSpecificOrderItems } from "./apiOrders";

const options = ["All", "Completed", "Pending", "Canceled"];

const tableHeaders = ["O.Id", "Customer Name", "Product Name", "Unit Price", "Total Price", "Quantity", "Delivery Status"];

const columnNames = ["order_item_id", "customer_name", "product_name", "unit_price", "total_price", "quantity", "status"];

function Orders() {
  const [orders, setOrders] = useState([]);
  // const [verifyProductClicked, setVerifyProductClicked] = useState(false);
  // const [addProductClicked, setAddProductClicked] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getAllorderItems(user.id, setOrders);
  }, []);

  const onChangeOrderType = (option) => {
    setSelectedOrderType(option);

    if (option === "All") return getAllorderItems(user.id, setOrders);

    if (option === "Pending") return getSpecificOrderItems(user.id, 0, setOrders);

    if (option === "Canceled") return getSpecificOrderItems(user.id, 2, setOrders);

    //Completed
    return getSpecificOrderItems(user.id, 1, setOrders);
  };

  // const onAddProduct = () => setAddProductClicked(!addProductClicked);

  const onRefreshData = () => {
    onChangeOrderType(selectedOrderType);
  };

  const changeDeliveryStatus = async (itemId, status) => {
    await changeDeliveryType(itemId, status);
    onRefreshData();
  };

  const topProps = {
    title: "Orders",
    // settingsClicked: verifyProductClicked,
    // setSettingsClicked: setVerifyProductClicked,
    // onClickAddButton: onAddProduct,
    dataLength: orders.length,
    onRefresh: onRefreshData,
  };

  const selectProps = {
    options: options,
    selectedItemType: selectedOrderType,
    onChangeItemType: onChangeOrderType,
  };

  const onClickRow = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {/* {verifyProductClicked && <VerifyProductsForm setVerifyProductClicked={setVerifyProductClicked} setOrders={setOrders} />} */}

      {/* {addProductClicked && <AddProductForm setAddProductClicked={setAddProductClicked} setOrders={setOrders} />} */}

      <div className={styles.container}>
        {/* Common TOP */}
        <CommonTop {...topProps} />

        {/* Common Selector */}
        <CommonSelector {...selectProps} />

        {orders && (
          <CustomTable
            rows={orders}
            headers={tableHeaders}
            manage={{ changeStatus: changeDeliveryStatus }}
            columns={columnNames}
            orderColumn='status'
          />
        )}
      </div>
    </>
  );
}

export default Orders;
