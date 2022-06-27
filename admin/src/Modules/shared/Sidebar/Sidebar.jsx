import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { ReactComponent as DashboardIcon } from "../../../asset/svg/dashboard.svg";
import { ReactComponent as CategoryIcon } from "../../../asset/svg/category.svg";
import ListItem from "../ListItem/ListItem";
import { ReactComponent as ArrowLeftIcon } from "../../../asset/svg/arrowLeft.svg";
import { ReactComponent as ArrowRightIcon } from "../../../asset/svg/arrowRight.svg";
import { useNavigate } from "react-router-dom";

const items = [
  { id: 1, name: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { id: 2, name: "Categories", icon: <CategoryIcon />, path: "/categories" },
  { id: 3, name: "Sub Categories", icon: <DashboardIcon />, path: "/subcategories" },
  { id: 4, name: "Sellers", icon: <DashboardIcon />, path: "/sellers" },
  { id: 5, name: "Reports", icon: <DashboardIcon />, path: "/reports" },
  { id: 6, name: "Administration", icon: <DashboardIcon />, path: "/administration" },
  { id: 7, name: "Help", icon: <DashboardIcon />, path: "/help" },
];

function Sidebar({ collapsed, setCollapsed, activeComponent }) {
  const navigate = useNavigate();

  const clickHandler = (name) => {
    navigate(name);
  };

  return (
    <div className={collapsed ? `${styles.container} ${styles.collapsedContainer}` : styles.container}>
      <div className={collapsed ? `${styles.sidebar} ${styles.collapsedSidebar}` : styles.sidebar}>
        {items.map((item) => (
          <ListItem key={item.id} item={item} active={activeComponent === item.path} onClick={() => clickHandler(item.path)} collapsed={collapsed} />
        ))}

        <div
          className={styles.collapseIcon}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </div>
      </div>

      {/* <div className={styles.adminVersion}>
        {!collapsed ? (
          <>
            <h5>E-COM</h5>
            <span>Version 0.0.1</span>
          </>
        ) : (
          <h5>E</h5>
        )}
      </div> */}
    </div>
  );
}

export default Sidebar;
