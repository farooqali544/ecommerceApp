import React, { useEffect, useState } from "react";
import styles from "./ShowProduct.module.css";
import { ReactComponent as StarFilled } from "../../asset/svg/starFilled.svg";
import { ReactComponent as StarEmpty } from "../../asset/svg/starEmpty.svg";
import MobilePic from "../../asset/images/mobile.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation, useParams } from "react-router-dom";
import { getOneProduct } from "./apiShowProduct";
import Backdrop from "@mui/material/Backdrop";
import { ClickAwayListener } from "@mui/material";

function ShowProduct({ productData }) {
  const [product, setProduct] = useState(null);
  const [imageOverlay, setImageOverlay] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getOneProduct(id, setProduct);
  }, []);

  const status = product && product.productDetails.status;
  const photos = product && product.photos;
  const product_name = product && product.productDetails.product_name;
  const product_description = product && product.productDetails.product_description;
  const unit_price = product && product.productDetails.unit_price;
  const unit_weight = product && product.productDetails.unit_weight;
  const units_in_stock = product && product.productDetails.units_in_stock;
  const size = product && product.productDetails.size;
  const color = product && product.productDetails.color;
  const thumbnail = product && product.productDetails.thumbnail;
  const productStatusString = status === 1 ? "Active" : "Inactive";

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
                {console.log(item)}
                <img
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
              <img src='/storedImages/1652713008077.jpg' alt='NO PHOTOS' />
            </SwiperSlide>
          )}
        </Swiper>

        <div className={styles.specs}>
          <h5 className={styles.productTitle}>
            {product_name} <span className={status === 0 ? styles.inactive : ""}>{productStatusString}</span>
          </h5>

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

          <span className={styles.description}>{product_description}</span>

          <div className={styles.stock}>
            In Stock
            <span>{units_in_stock}</span>
          </div>

          <span className={styles.color}>
            {console.log(color)}
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
        </div>
      </div>
    );
}

export default ShowProduct;
