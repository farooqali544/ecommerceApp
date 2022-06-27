import React from "react";
import styles from "./ListItem.module.css";
import { Tooltip } from "@mui/material";

function ListItem({ item, active, onClick, collapsed }) {
  return (
    <Tooltip title={item.name} placement='right' arrow disableHoverListener={!collapsed} key={item.id}>
      <div
        className={collapsed ? `${styles.listItem} ${styles.collapsedListItem}` : styles.listItem}
        id={active ? styles.listItemActive : ""}
        onClick={onClick}
      >
        {item.icon}
        {!collapsed && <span>{item.name}</span>}
      </div>
    </Tooltip>
  );
}

export default ListItem;
