import React, { useContext, useEffect, useState } from "react";
import styles from "./ShowProduct.module.css";
import { ReactComponent as StarFilled } from "../../asset/svg/starFilled.svg";
import { ReactComponent as StarEmpty } from "../../asset/svg/starEmpty.svg";
import { ReactComponent as CloseIcon } from "../../asset/svg/close.svg";
import noImage from "../../asset/images/noImage.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation, useParams } from "react-router-dom";
import { addCartItem, getOneProduct, updateItemQuantity } from "./apiShowProduct";
import Backdrop from "@mui/material/Backdrop";
import { ClickAwayListener } from "@mui/material";
import { CartContext } from "../../App";
import { checkOutOrder } from "../ShowCart/apiShowCart";

function ShowProduct({ productId, setSelectedProduct }) {
  const [product, setProduct] = useState(null);
  const [imageOverlay, setImageOverlay] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);

  const { getCartItems } = useContext(CartContext);
  const { customer_id } = useContext(CartContext);

  useEffect(() => {
    getOneProduct(productId, setProduct);
  }, []);

  const status = product && product.productDetails.status;
  const photos = product?.photos;
  const product_name = product && product.productDetails.product_name;
  const product_description = product && product.productDetails.product_description;
  const unit_price = product && product.productDetails.unit_price;
  const unit_weight = product && product.productDetails.unit_weight;
  const units_in_stock = product && product.productDetails.units_in_stock;
  const size = product && product.productDetails.size;
  const color = product && product.productDetails.color;
  const thumbnail = product && product.productDetails.thumbnail;
  const productStatusString = status === 1 ? "Active" : "Inactive";

  const addToCart = async () => {
    const insertData = {
      cart_id: customer_id,
      product_id: productId,
      quantity: itemQuantity,
    };
    await addCartItem(insertData).catch(async (err) => {
      if (err.response.data.errno === 1062) {
        const updateData = {
          cart_id: customer_id,
          product_id: productId,
          quantity: itemQuantity,
        };
        await updateItemQuantity(updateData);
        alert("Item Already Present in Cart, Added Quantity");
      } else throw err;
    });
    getCartItems(customer_id);
  };

  const onBuyProduct = async () => {
    const orderItemdata = { product_id: productId, quantity: itemQuantity, status: 0 };

    const postData = {
      customer_id: customer_id,
      orderItems: [orderItemdata],
    };

    await checkOutOrder(postData).then((resp) => {
      alert("Thankyou For Your Order, Your Order Is Being Processed");
    });
  };

  if (product)
    return (
      <div className={styles.container}>
        {imageOverlay && (
          <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={true}>
            <ClickAwayListener
              onClickAway={() => {
                setImageOverlay(null);
              }}
            >
              <img className={styles.zoomedImage} src={imageOverlay} alt='' />
            </ClickAwayListener>
          </Backdrop>
        )}

        <Swiper pagination={true} navigation={true} centeredSlides modules={[Pagination, Navigation]} className={styles.swiper}>
          {photos &&
            photos.length > 0 &&
            photos.map((item, index) => (
              <SwiperSlide className={styles.slide} key={index}>
                <img
                  style={{ backgroundColor: "#354259" }}
                  key={index}
                  src={item.photo}
                  onClick={() => {
                    setImageOverlay(item.photo);
                  }}
                />
              </SwiperSlide>
            ))}

          {(!photos || photos.length == 0) && (
            <SwiperSlide className={styles.slide}>
              <img src={noImage} alt='NO PHOTOS' />
            </SwiperSlide>
          )}
        </Swiper>

        <div className={styles.specs}>
          <div className={styles.productTitle}>
            <h5 className={styles.title}>{product_name}</h5>
            <span className={status === 0 ? `${styles.inactive} ${styles.status}` : styles.status}>{productStatusString}</span>
            <span id={styles.closeIcon} onClick={() => setSelectedProduct(null)}>
              Close <CloseIcon width={16} height={16} />
            </span>
          </div>

          <span className={styles.price}>{unit_price}</span>

          <span className={styles.reviews}>
            {[1, 2, 3].map((item) => (
              <StarFilled width={18} height={18} key={item} />
            ))}
            {[4, 5].map((item) => (
              <StarEmpty width={18} height={18} key={item} />
            ))}
            <span className={styles.reviewCount}>8 Reviews</span>
          </span>

          <span className={styles.description}>
            {product_description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus impedit, quasi ipsum magnam consequuntur
            laudantium voluptatum suscipit, iusto totam in voluptatibus aut atque. Suscipit excepturi aspernatur fugiat repellendus illum!
          </span>

          <div className={styles.stock}>
            In Stock
            <span>{units_in_stock > 0 ? "Availale" : "Out of Stock"} </span>
          </div>

          <span className={styles.color}>
            Color <span style={{ backgroundColor: color }}></span>
          </span>

          <div className={styles.sizeWeightWrapper}>
            <div className={styles.size}>
              <label>Size</label>
              <span>{size}</span>
            </div>

            <div className={styles.weight}>
              <label>Weight</label>
              <span>{unit_weight}</span>
            </div>
          </div>

          <div className={styles.purchase}>
            <button className={styles.buy} disabled={itemQuantity < 1 || units_in_stock < 1} onClick={onBuyProduct}>
              Buy Product
            </button>
            <input type={"number"} style={{ width: 60, padding: 5 }} value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
            <button className={styles.cart} onClick={addToCart} disabled={itemQuantity < 1 || units_in_stock < 1}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
}

export default ShowProduct;
