const express = require("express");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log("listening");
});

//routers
const categoryRouter = require("./routes/category");
app.use("/category", categoryRouter);

const subCategoryRouter = require("./routes/subCategory");
app.use("/subcategory", subCategoryRouter);

const customersRouter = require("./routes/customers");
app.use("/customer", customersRouter);

const productRouter = require("./routes/products");
app.use("/product", productRouter);

const cartItemRouter = require("./routes/cartItem");
app.use("/cartitem", cartItemRouter);

const sellerRouter = require("./routes/seller");
app.use("/seller", sellerRouter);

const orderRouter = require("./routes/order");
app.use("/order", orderRouter);

const orderItemRouter = require("./routes/orderItem");
app.use("/orderItem", orderItemRouter);
