const express = require("express");
const connection = require("../db");
const { route } = require("./category");
const router = express.Router();

router.get("/getCartItems/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const data = req.body;

  const sql = `SELECT * from cart_items where cart_id = ${cartId}`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json(result);
  });
});

router.get("/getCartItemsWithData/:cartId", async (req, res) => {
  const { cartId } = req.params;

  const sql = `select cart_items.*, 
  products.product_name, products.thumbnail, products.product_description, products.unit_price, products.color, products.size, products.unit_weight, products.seller_id, products.status,
  seller.full_name as seller_name
  from cart_items join products on cart_items.product_id = products.product_id join seller on products.seller_id=seller.seller_id where cart_id = ${cartId}
  `;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json(result);
  });
});

router.post("/add", (req, res) => {
  const data = req.body;

  const insertData = {
    cart_id: data.cart_id,
    product_id: data.product_id,
    quantity: data.quantity,
  };

  const sql = "INSERT INTO cart_items SET ?";

  connection.query(sql, insertData, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Added Cart Item");
  });
});

router.post("/updateQuantity", (req, res) => {
  const data = req.body;

  const sql = `UPDATE cart_items SET quantity = quantity + ${data.quantity} WHERE cart_id=${data.cart_id} && product_id=${data.product_id}`;

  connection.query(sql, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Updated Cart Item");
  });
});

router.post("/delete", (req, res) => {
  const data = req.body;

  const sql = "delete from cart_items where cart_item_id in (?)";

 
  connection.query(sql, [data], (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Delete Cart Items");
  });
});
module.exports = router;
