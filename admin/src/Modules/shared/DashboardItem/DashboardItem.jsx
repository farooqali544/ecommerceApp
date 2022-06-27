import React from "react";
import styles from "./DashboardItem.module.css";
import { ReactComponent as LeftArrowIcon } from "../../../asset/svg/arrowLeft.svg";
import { ReactComponent as RightArrowIcon } from "../../../asset/svg/arrowRight.svg";

function DashboardItem({ title, subTitle, children }) {
  return (
    <div className={styles.container}>
      <h5>{title}</h5>

      {children}

      {/* <div className={styles.leftArrow}>◀</div>
      <div className={styles.rightArrow}>▶</div>

      <div className={styles.dotsWrapper}>
        <span className={styles.dots} id= {styles.activeSlide}></span>
        <span className={styles.dots}></span>
        <span className={styles.dots}></span>
      </div> */}
    </div>
  );
}

export default DashboardItem;
