import React from "react";
import styles from "./Header.module.css";
import avatarImage from "../../asset/images/avatar.png";
import { ReactComponent as SearchIcon } from "../../asset/svg/search.svg";
import { ReactComponent as NotificationIcon } from "../../asset/svg/notification.svg";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <img src={avatarImage} alt='avatar' width={40} height={40} />
          <h5>Farooq Ali</h5>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.searchBox}>
            <SearchIcon width={24} height={24}/>
            <input type='text' placeholder="Quick Search"/>
          </div>
          <NotificationIcon width = {24} height = {24}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
