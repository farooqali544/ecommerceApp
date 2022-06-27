import React, { useEffect, useState, memo, Children } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Categories from "../Categories/Categories";
import Sidebar from "../shared/Sidebar/Sidebar";
import styles from "./Body.module.css";
import Sellers from "../Sellers/Sellers";
import ComingSoon from "../shared/ComingSoon/ComingSoon";
import SubCategories from "../SubCategories/SubCategories";
import { useLocation, Route, Routes } from "react-router-dom";

function Body({ children }) {
  const location = useLocation();

  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Sidebar collapsed={collapsedSidebar} setCollapsed={setCollapsedSidebar} activeComponent={location.pathname} />
        {children}
      </div>
    </div>
  );
}

export default Body;
