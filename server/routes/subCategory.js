const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get("/getAll", (req, res) => {
  const sql = "select subcategory.*, category.category_name from subcategory left join category ON category.category_id = subcategory.category_id;";

  connection.query(sql, (err, result) => {
    if (err) res.status(400).json(err);

    return res.status(200).json(result);
  });
});

router.get("/getStatusSpecificSubCategories", (req, res) => {
  if (req.query["status"]) {
    const sql = `select subcategory.*, category.category_name from subcategory left join category ON category.category_id = subcategory.category_id where active_status=${req.query["status"]}`;

    connection.query(sql, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(result);
    });
  } else return res.status(400).json("ERRROR NO StATUS");
});

router.post("/add", (req, res) => {
  const data = req.body;
  const insertData = {
    category_id: data.category_id,
    sub_category_name: data.sub_category_name,
    description: data.description,
    picture: data.picture,
    active_status: data.active_status,
  };

  const sql = "INSERT INTO subcategory SET ?";

  connection.query(sql, insertData, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Inserted Successfully");
  });
});

router.post("/changeStatus", (req, res) => {
  const data = req.body;

  const updateData = {
    sub_category_id: data.sub_category_id,
    active_status: data.active_status,
  };

  const sql = `UPDATE subcategory set ? WHERE sub_category_id=${data.sub_category_id}`;

  connection.query(sql, updateData, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Updated Status");
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM subcategory WHERE sub_category_id=${id}`;

  connection.query(sql, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Deleted");
  });
});

module.exports = router;
