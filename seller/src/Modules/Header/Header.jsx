import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import avatarImage from "../../asset/images/avatar.png";
import { ReactComponent as SearchIcon } from "../../asset/svg/search.svg";
import { ReactComponent as NotificationIcon } from "../../asset/svg/notification.svg";
import { ReactComponent as LogoutIcon } from "../../asset/svg/logout.svg";
import { useAuth } from "../../utils/auth";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Header() {
  const auth = useAuth();
  const [sellerName, setSellerName] = useState("");
  const location = useLocation();

  const onLogOut = () => {
    auth.logout();
  };

  const getSellerName = (sellerId) => {
    axios.get(`http://localhost:8000/seller/getName?id=${sellerId}}`).then((resp) => {
      setSellerName(resp.data);
    });
  };

  useEffect(() => {
    if (auth.user) getSellerName(auth.user.id);
  }, [auth]);

  if (!auth.user || location.pathname === "/login" || location.pathname === "/signup") return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <img src={avatarImage} alt='avatar' width={40} height={40} />
          <h5>{sellerName}</h5>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.searchBox}>
            <SearchIcon width={24} height={24} />
            <input type='text' placeholder='Quick Search' />
          </div>
          <span className={styles.logout} onClick={onLogOut}>
            <span>Log Out</span>
            <LogoutIcon width={24} height={24} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
