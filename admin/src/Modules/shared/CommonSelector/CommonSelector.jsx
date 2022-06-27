import React from "react";
import styles from "./CommonSelector.module.css";

function CommonSelector({ options, selectedItemType, onChangeItemType }) {
  return (
    <ul className={styles.itemTypePicker}>
      {options.map((option) => (
        <li id={selectedItemType === option ? styles.activeItem : ""} onClick={() => onChangeItemType(option)}>
          {option}
        </li>
      ))}
    </ul>
  );
}

export default CommonSelector;
