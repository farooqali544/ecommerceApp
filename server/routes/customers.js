const express = require("express");
const { route } = require("./category");
const bcrypt = require("bcrypt");
const connection = require("../db");

const router = express.Router();

router.post("/add", (req, res) => {
  const data = req.body;
  bcrypt.hash(data.customer_password, 10, function (err, hash) {
    if (err) return res.status(400).json(err);

    const insertData = {
      customer_name: data.customer_name,
      customer_address: data.customer_address,
      customer_phone: data.customer_phone,
      customer_city: data.customer_city,
      customer_zip: data.customer_zip,
      customer_email: data.customer_email,
      customer_password: hash,
    };

    const sql = "INSERT INTO customers SET ?";

    connection.query(sql, insertData, (err, result) => {
      if (err) return res.status(400).json(err);

      const recentInsertedCustomer = result.insertId;

      const cartSql = `INSERT INTO cart VALUES(${recentInsertedCustomer})`;

      connection.query(cartSql, (err) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json("Added Customer + Added Cart");
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { customer_email, customer_password } = req.body;

  const sql = `SELECT * FROM customers WHERE customer_email= "${customer_email}"`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    if (result.length === 0) return res.status(403).json("No Such User Found");

    const storedHash = result[0].customer_password;

    bcrypt.compare(customer_password, storedHash, (err, result) => {
      if (err) return res.status(400).json(err);

      if (!result) return res.status(403).json("Invalid Password");

      return res.status(200).json("Login Successfull");
    });
  });
});

router.get("/getCustomer/:id", (req, res) => {
  const id = req.params.id;

  const sql = `select * from customers WHERE customer_id=${id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json(result);
  });
});

module.exports = router;
