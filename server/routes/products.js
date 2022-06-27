const express = require("express");
const connection = require("../db");
const router = express.Router();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../seller/public/storedImages");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const getAllProductsQuery = `select products.*, subcategory.sub_category_name from products left join subcategory ON subcategory.sub_category_id = products.sub_category_id `;

router.get("/getAll/:sellerId", (req, res) => {
  const { sellerId } = req.params;

  const sql = `${getAllProductsQuery} where seller_id = ${sellerId}`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json(result);
  });
});

router.get("/getStatusSpecificProducts/:sellerId", (req, res) => {
  const { sellerId } = req.params;

  if (req.query["status"]) {
    const sql = `${getAllProductsQuery} where seller_id = ${sellerId} AND status=${req.query["status"]}`;

    connection.query(sql, (err, result) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(result);
    });
  } else return res.status(400).json("ERRROR NO StATUS");
});

router.get("/getProductsFromSubCategory/:subCategoryId", (req, res) => {
  const { subCategoryId } = req.params;

  const sql = `select products.*, seller.full_name as seller_name from products join seller on products.seller_id = seller.seller_id where sub_category_id = ${subCategoryId} AND status=1`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json(result);
  });
});

router.post("/add", async (req, res) => {
  const data = req.body;

  console.log(data);

  const insertData = {
    sub_category_id: data.sub_category_id,
    seller_id: data.seller_id,
    product_name: data.product_name,
    product_description: data.product_description,
    unit_price: data.unit_price,
    size: data.size,
    color: data.color,
    unit_weight: data.unit_weight,
    units_in_stock: data.units_in_stock,
    status: data.status,
    thumbnail: data.thumbnail,
  };

  console.log(insertData);

  const sql = "INSERT INTO products SET ?";

  connection.query(sql, insertData, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json({ product: result.insertId });
  });
});

router.post("/addPhotos/:productId", async (req, res) => {
  const { productId } = req.params;
  const data = req.body;

  const sql = "INSERT INTO product_photos(photo, product_id) VALUES ?";

  const values = data.map((item) => [item, productId]);

  connection.query(sql, [values], (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Photos Added");
  });
});

router.delete("/deleteProduct/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM products WHERE product_id=${id}`;

  connection.query(sql, (err) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Deleted Product");
  });
});

router.post("/update/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const updateData = {
    sub_category_id: data.sub_category_id,
    seller_id: data.seller_id,
    product_name: data.product_name,
    product_description: data.product_description,
    unit_price: data.unit_price,
    size: data.size,
    color: data.color,
    unit_weight: data.unit_weight,
    units_in_stock: data.units_in_stock,
    product_available: data.product_available,
  };

  const sql = `UPDATE products SET ? WHERE product_id = ${id}`;

  connection.query(sql, updateData, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Product Updated");
  });
});

router.post("/updateBullk/status", (req, res) => {
  const data = req.body;
  var queries = "";

  data.forEach((item) => {
    queries += connection.format("UPDATE products SET status = ? where product_id = ?;", [item["status"], item["product_id"]]);
  });

  connection.query(queries, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Updated Products");
  });
});

router.post("/deleteBulk", (req, res) => {
  const data = req.body;
  console.log(data);
  const temp = data.map((item) => item.product_id).join(", ");
  const sql = `DELETE FROM products where product_id in (${temp});`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);

    return res.status(200).json("Deleted Products");
  });
});

router.get("/getOneProduct/:id", (req, res) => {
  const { id } = req.params;

  const sqlProduct = `SELECT * from products where product_id = ${id}`;
  const sqlProductPhotos = `SELECT * from product_photos where product_id = ${id}`;

  connection.query(sqlProduct, (err1, productResult) => {
    if (err1) return res.status(400).json(err1);

    if (productResult.length > 0) {
      connection.query(sqlProductPhotos, (err2, photosResult) => {
        if (err2) return res.status(400).json(err2);

        console.log("hi");
        return res.status(200).json({ productDetails: productResult[0], photos: photosResult });
      });
    }
  });
});

module.exports = router;
