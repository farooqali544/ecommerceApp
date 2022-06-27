import React, { useEffect, useState } from "react";

import { getAllCategories, getAllSubCategories } from "./apiBody";
import Products from "../../Pages/Products/Products";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Body.module.css";

function Body() {
  const [products, setProducts] = useState([]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Sidebar setProducts={setProducts} />

        <Products products={products} />
      </div>
    </div>
  );
}

export default Body;
