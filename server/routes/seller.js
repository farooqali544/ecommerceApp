const express = require("express");
const connection = require("../db");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const verifyJwt = require("../MiddleWares/verifyJwt");

router.get("/all", (req, res) => {
  const sql = "SELECT *, concat(trim(trailing ' ' from first_name), ' ', last_name) AS full_name FROM seller";

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json(result);
  });
});

router.get("/getStatusSpecificSellers", (req, res) => {
  if (req.query["status"]) {
    const sql = `SELECT *, concat(trim(trailing ' ' from first_name), ' ', last_name) AS full_name FROM seller where verified=${req.query["status"]}`;

    connection.query(sql, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(result);
    });
  } else return res.status(400).json("ERRROR NO StATUS");
});

router.post("/add", (req, res) => {
  const data = req.body;

  bcrypt.hash(data.password, 10, (err, hash) => {
    if (err) return res.status(400).json(err);

    const insertData = {
      first_name: data.first_name,
      last_name: data.last_name,
      address: data.address,
      city: data.city,
      country: data.country,
      phone: data.phone,
      photo: data.photo,
      dob: data.dob,
      email: data.email,
      // username: data.username,
      password: hash,
    };

    const sql = "INSERT INTO seller SET ?";

    connection.query(sql, insertData, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json("Added Seller");
    });
  });
});

router.post("/update/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const updateData = {
    first_name: data.first_name,
    last_name: data.last_name,
    address: data.address,
    city: data.city,
    country: data.country,
    phone: data.phone,
    photo: data.photo,
    dob: data.dob,
    email: data.email,
    username: data.username,
    verified: data.verified,
  };

  const sql = `UPDATE seller SET ? WHERE seller_id=${id}`;

  connection.query(sql, updateData, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Updated Seller");
  });
});

router.post("/updateBullk/status", (req, res) => {
  const data = req.body;
  var queries = "";

  data.forEach((item) => {
    queries += connection.format("UPDATE seller SET verified = ? where seller_id = ?;", [item["verified"], item["seller_id"]]);
  });

  console.log(queries);

  connection.query(queries, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Updated Seller");
  });
});

router.get("/isSellerAuth", verifyJwt, (req, res) => {
  res.send({ auth: true, sellerId: req.sellerId });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * from seller WHERE email="${email}"`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    if (result.length === 0) return res.status(403).json({ error: "No such user found", errorCode: 1 });

    const storedHash = result[0].password;

    bcrypt.compare(password, storedHash, (err, response) => {
      if (err) return res.status(400).json(err);

      if (!response) return res.status(403).json({ error: "Invalid Password", errorCode: 2 });

      const id = result[0].seller_id;

      const token = jwt.sign({ id }, "jwtSecret");

      return res.status(200).json({ auth: true, token: token, result: result[0] });
    });
  });
});

router.post("/verifyusername", (req, res) => {
  const { username } = req.body;

  const sql = `SELECT username from seller where username = "${username}"`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    if (result.length === 0) return res.status(200).json({ userFound: 0 });

    return res.status(200).json({ userFound: 1 });
  });
});

router.post("/verifyemail", (req, res) => {
  const { email } = req.body;

  const sql = `SELECT email from seller where email = "${email}"`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    if (result.length === 0) return res.status(200).json({ emailFound: 0 });

    return res.status(200).json({ emailFound: 1 });
  });
});

router.get("/getName", (req, res) => {
  if (req.query["id"]) {
    const sql = `SELECT concat(trim(trailing ' ' from first_name), ' ', last_name) AS full_name from seller where seller_id = "${req.query.id}"`;

    connection.query(sql, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(result[0]?.full_name);
    });
  } else {
    return res.json("No id found");
  }
});

module.exports = router;
