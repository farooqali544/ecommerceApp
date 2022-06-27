const express = require("express");
const connection = require("../db");
const router = express.Router();

router.get("/getAll/:sellerId", (req, res) => {
  const { sellerId } = req.params;
  const sql = `SELECT * from order where seller_id = ${sellerId}`;

  connection.query(sql, (err, result) => {
    if (err) return res.json(err);

    return res.json(result);
  });
});

router.post("/add", (req, res) => {
  const data = req.body;
  const insertData = {
    customer_id: data.customer_id,
    status: 1,
  };

  const sql = `insert into \`order\` set ?`;

  connection.query(sql, insertData, (err, result) => {
    if (err) return res.json(err);

    const values = data.orderItems.map((item) => [result.insertId, item.product_id, item.quantity, item.status]);

    const sql = "insert into order_item( order_id, product_id, quantity, `status`) VALUES?";

    connection.query(sql, [values], (err, result) => {
      if (err) return res.json(err);

      return res.json(result);
    });
  });
});

module.exports = router;
