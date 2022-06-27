import React, { useEffect, useState, memo } from "react";
import Sidebar from "../shared/Sidebar/Sidebar";
import styles from "./Body.module.css";
import { useLocation, Route, Routes } from "react-router-dom";

function Body({ children }) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const location = useLocation();

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
