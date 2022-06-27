import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import avatarImage from "../../asset/images/avatar.png";
import { ReactComponent as SearchIcon } from "../../asset/svg/search.svg";
import { ReactComponent as LogoutIcon } from "../../asset/svg/logout.svg";
import { ReactComponent as CartIcon } from "../../asset/svg/cart.svg";
import { getCartItems } from "./apiHeader";
import axios from "axios";

function Header({ cartItems, customer_id, setShowCartPage, customer }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <img src={avatarImage} alt='avatar' width={40} height={40} />
          <h5> {customer && customer.customer_name}</h5>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.searchBox}>
            <SearchIcon width={24} height={24} />
            <input type='text' placeholder='Quick Search' />
            <span className={styles.cart} onClick={() => setShowCartPage(true)}>
              <CartIcon width={24} height={24} />
              {cartItems && cartItems.length > 0 && <span className={styles.cartItems}>{cartItems.length}</span>}
            </span>
          </div>

          <span className={styles.logout}>
            <span>Log Out</span>
            <LogoutIcon width={24} height={24} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
