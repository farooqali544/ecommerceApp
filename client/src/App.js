import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";

import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";

export const CartContext = createContext(null);

const getCustomer = async (id, setCustomer) => {
  await axios
    .get(`http://localhost:8000/customer/getCustomer/${id}`)
    .then((resp) => setCustomer(resp.data[0]))
    .catch((err) => {
      throw err;
    });
};

const customer_id = 20;

function App() {
  const [customer, setCustomer] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);

  const getCartItems = (cartId) => {
    axios
      .get(`http://localhost:8000/cartitem/getCartItems/${cartId}`)
      .then((resp) => {
        setCartItems(resp.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getCustomer(customer_id, setCustomer);
    getCartItems(customer_id);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        getCartItems: getCartItems,
        customer_id: customer_id,
        showCartPage: showCartPage,
        setShowCartPage: setShowCartPage,
      }}
    >
      <div className='app'>
        <Header cartItems={cartItems} customer_id={customer_id} setShowCartPage={setShowCartPage} customer={customer} />
        <Body />
      </div>
    </CartContext.Provider>
  );
}

export default App;
