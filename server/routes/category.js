const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get("/getStatusSpecificCategories", (req, res) => {
  if (req.query["status"]) {
    const sql = `SELECt * FROM category where active_status=${req.query["status"]}`;

    connection.query(sql, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(result);
    });
  } else return res.status(400).json("ERRROR NO StATUS");
});

router.get("/getAllCategories", (req, res) => {
  let sql = "SELECT * FROM category";

  connection.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/addCategory", (req, res) => {
  const data = req.body;

  const insertionData = {
    category_name: data.category_name,
    description: data.description,
    active_status: data.active_status,
  };

  const sql = "INSERT INTO category set ?";

  connection.query(sql, insertionData, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Successfull Added");
  });
});

router.delete("/deleteCategory/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM category where category_id=${id}`;

  connection.query(sql, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Deleted Category");
  });
});

router.post("/changeStatus", (req, res) => {
  const data = req.body;

  const updateData = {
    category_id: data.category_id,
    active_status: data.active_status,
  };

  const sql = `UPDATE category set ? WHERE category_id=${data.category_id}`;

  connection.query(sql, updateData, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Updated Status");
  });
});

module.exports = router;
