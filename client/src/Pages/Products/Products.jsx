import React, { useContext, useState } from "react";
import { CartContext } from "../../App";
import ShowCart from "../ShowCart/ShowCart";
import ShowProduct from "../ShowProduct/ShowProduct";
import styles from "./Products.module.css";

// const ProductCard = () =>{
//   return <div></div>
// }

const colors = ["#C2DED1", "#354259", "#CDC2AE", "#ECE5C7"];

function Products({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { showCartPage } = useContext(CartContext);

  if (showCartPage) return <ShowCart />;

  if (!products || products.length == 0) return <div>No Products Found</div>;

  if (selectedProduct) return <ShowProduct productId={selectedProduct} setSelectedProduct={setSelectedProduct} />;

  return (
    <div className={styles.container}>
      {products.map((product, index) => {
        const color = colors[index % 4];

        return (
          <div className={styles.productCard} onClick={() => setSelectedProduct(product.product_id)}>
            <div className={styles.imageHolder} style={{ backgroundColor: color }}>
              <img src={product.thumbnail} loading='lazy' alt='' />
            </div>
            <div className={styles.productDetails}>
              <span className={styles.name}>{product.product_name}</span>

              <span className={styles.price}>Rs. {product.unit_price}</span>

              <span className={styles.seller}>
                Sold By <span>{product.seller_name}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
