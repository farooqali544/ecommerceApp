import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../App";
import styles from "./ShowCart.module.css";
import { checkOutOrder, deleteCartItems, getCartItemsWithData } from "./apiShowCart";

function ShowCart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkBoxesSelected, setCheckBoxesSelected] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { customer_id } = useContext(CartContext);
  const { setShowCartPage } = useContext(CartContext);
  const { getCartItems } = useContext(CartContext);

  useEffect(() => {
    getCartItemsWithData(customer_id, setCartItems);
  }, []);

  const onChangeCheckbox = (id, quantity, price) => {
    if (checkBoxesSelected.includes(id)) {
      setCheckBoxesSelected(checkBoxesSelected.filter((checkbox) => checkbox != id));
      setTotalItems(totalItems - quantity);
      setTotalPrice(totalPrice - quantity * price);
    } else {
      setCheckBoxesSelected((prev) => [...prev, id]);
      setTotalItems(totalItems + quantity);
      console.log(price);
      setTotalPrice(totalPrice + quantity * price);
    }
  };

  const onCheckOut = async () => {
    const orderItems = cartItems.filter((cartItem) => checkBoxesSelected.includes(cartItem.cart_item_id));

    const temp = orderItems.map((item) => ({ product_id: item.product_id, quantity: item.quantity, status: 0 }));

    const postData = {
      customer_id: customer_id,
      orderItems: temp,
    };

    await checkOutOrder(postData).then(async (resp) => {
      const deleteData = orderItems.map((item) => item.cart_item_id);
      await deleteCartItems(deleteData);
      getCartItems(customer_id);
      getCartItemsWithData(customer_id, setCartItems);
      alert("Thankyou For Your Order, Your Order Is Being Processed");
    });
  };

  return (
    <>
      <div className={styles.cartItemContainer}>
        {(!cartItems || cartItems.length === 0) && <div>No Items</div>}
        <div onClick={() => setShowCartPage(false)} className={styles.goback}>
          Go back
        </div>
        {cartItems.map((item) => (
          <div className={styles.cartItem}>
            <input
              type='checkbox'
              checked={checkBoxesSelected.includes(item.cart_item_id)}
              onChange={() => onChangeCheckbox(item.cart_item_id, item.quantity, item.unit_price)}
            />

            <div className={styles.thumbnail}>
              <img src={item.thumbnail} alt='Photo' />
            </div>

            <div className={styles.specs}>
              <span className={styles.name}>{item.product_name}</span>

              <span className={styles.desc}>
                Color:<span className={styles.color} style={{ backgroundColor: item.color }}></span>size:{item.size}, weight:{item.unit_weight}
              </span>

              <span className={styles.sellerName}>{item.seller_name}</span>

              <span className={styles.price}>{item.product_price}</span>
            </div>

            <span className={styles.price}>
              <span className={styles.unitPrice}>Unit Price: Rs. {item.unit_price}</span>
              <span className={styles.quantity}>Quantity: {item.quantity}</span>
              <span className={styles.totalPrice}>Total Price: Rs. {item.unit_price * item.quantity}</span>
            </span>
          </div>
        ))}
      </div>

      <div className={styles.checkoutContainer}>
        <h5>Order Summary</h5>

        <span className={styles.subTotal}>
          Subtotal ({totalItems} items) <span>{totalPrice}</span>
        </span>

        <span className={styles.total}>
          Total <span>{totalPrice}</span>
        </span>

        <button onClick={() => onCheckOut()} disabled={cartItems.length === 0}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </>
  );
}

export default ShowCart;
