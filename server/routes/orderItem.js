const express = require("express");
const connection = require("../db");
const router = express.Router();

const getOrdersQuery =
  "select order_item.*, `order`.customer_id, customers.customer_name, products.product_name, products.unit_price, (products.unit_price * quantity) as total_price, products.seller_id from order_item inner join `order` on `order`.order_id = order_item.order_id inner join customers on customers.customer_id=`order`.customer_id inner join products on products.product_id=order_item.product_id";

router.get("/getAll/:sellerId", (req, res) => {
  const { sellerId } = req.params;
  const sql = `${getOrdersQuery} where products.seller_id = ${sellerId}`;

  connection.query(sql, (err, result) => {
    if (err) return res.json(err);

    return res.json(result);
  });
});

router.get("/getSpecificOrders/:sellerId", (req, res) => {
  const { sellerId } = req.params;

  if (req.query["status"]) {
    const sql = ` ${getOrdersQuery} where products.seller_id = ${sellerId} AND order_item.status=${req.query["status"]}`;

    connection.query(sql, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(result);
    });
  } else return res.status(400).json("ERRROR NO StATUS");
});

router.post("/add", async (req, res) => {
  const data = req.body;

  const insertData = {
    product_id: data.product_id,
    order_id: data.order_id,
    quantity: data.quantity,
    status: data.status,
  };

  const sql = "INSERT INTO order_item SET ?";

  connection.query(sql, insertData, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json({ orderId: result.insertId });
  });
});

router.post("/changeStatus/:id", (req, res) => {
  const { id } = req.params;
  if (req.query["status"]) {
    const sql = `UPDATE order_item set status = ${req.query["status"]} where order_item_id=${id}`;

    connection.query(sql, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json("Succesfully Updated");
    });
  } else {
    return res.json("no status found");
  }
});

module.exports = router;
