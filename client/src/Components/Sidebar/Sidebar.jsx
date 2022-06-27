import React, { useContext, useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { ReactComponent as ArrowRightIcon } from "../../asset/svg/arrowRight.svg";
import { getAllCategories, getAllSubCategories } from "../Body/apiBody";
import { getAllProducts } from "./apiSidebar";
import { CartContext } from "../../App";

function Sidebar({ setProducts }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [openCategories, setOpenCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { setShowCartPage } = useContext(CartContext);

  const handleClickCategory = (id) => {
    if (openCategories.includes(id)) {
      const temp = openCategories.filter((item) => item !== id);
      return setOpenCategories(temp);
    }

    return setOpenCategories((prev) => [...prev, id]);
  };

  const handleSubCategoryClick = (item) => {
    setShowCartPage(false);
    setSelectedSubCategory(item.sub_category_id);
    setSelectedCategory(item.category_id);

    getAllProducts(item.sub_category_id, setProducts);
  };

  useEffect(() => {
    getAllCategories(setCategories);
    getAllSubCategories(setSubCategories);
  }, []);

  return (
    <div className={styles.container}>
      {/* <h5 className={styles.title}>Categories</h5> */}

      <div className={styles.categories}>
        <span>Categories</span>
        {categories.map((category) => (
          <>
            <span
              onClick={() => handleClickCategory(category.category_id)}
              className={styles.category}
              key={category.category_id}
              id={selectedCategory === category.category_id ? styles.activeCategory : ""}
            >
              {category.category_name}
              <span id={openCategories.includes(category.category_id) ? styles.upArrow : ""}>
                <ArrowRightIcon height={12} width={12} />
              </span>
            </span>

            <div id={openCategories.includes(category.category_id) ? styles.opened : ""} className={styles.subCategories}>
              {subCategories
                .filter((item) => item.category_id === category.category_id)
                .map((item) => (
                  <span
                    className={styles.subCategory}
                    onClick={() => handleSubCategoryClick(item)}
                    id={item.sub_category_id === selectedSubCategory ? styles.activeSubCategory : ""}
                  >
                    {item.sub_category_name}
                  </span>
                ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
