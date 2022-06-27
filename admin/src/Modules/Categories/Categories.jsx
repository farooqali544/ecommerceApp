import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { ReactComponent as SearchIcon } from "../../asset/svg/search.svg";
import { ReactComponent as SettingIcon } from "../../asset/svg/setting.svg";
import { ReactComponent as OrderIcon } from "../../asset/svg/order.svg";
import CustomTable from "../shared/Table/CustomTable";
import CategoryForm from "./CategoryForm";
import { getAllCategories, getSpecificCategories } from "./apiCategories";
import CommonTop from "../shared/CommonTop/CommonTop";
import CommonSelector from "../shared/CommonSelector/CommonSelector";

const options = ["All", "Active", "Supsended"];

const tableHeaders = ["C.Id", "Name", "Description", "Status"];

const columnNames = ["category_id", "category_name", "description", "active_status"];

function Categories() {
  const [categories, setCategories] = useState([]);
  const [addCategoryClicked, setAddCategoryClicked] = useState(false);
  const [selectedCategoryType, setSelectedCategoryType] = useState("All");

  useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  const onChangeCategoryType = (option) => {
    setSelectedCategoryType(option);

    if (option === "All") return getAllCategories(setCategories);

    if (option === "Active") return getSpecificCategories(1, setCategories);

    //suspended
    return getSpecificCategories(0, setCategories);
  };

  const categoriesTopProps = {
    title: "Categories",
    settingsClicked: addCategoryClicked,
    setSettingsClicked: setAddCategoryClicked,
    dataLength: categories.length,
  };

  const categoriesSelectProps = {
    options: options,
    selectedItemType: selectedCategoryType,
    onChangeItemType: onChangeCategoryType,
  };

  return (
    <>
      {addCategoryClicked && <CategoryForm setAddCategoryClicked={setAddCategoryClicked} setCategories={setCategories} />}

      <div className={styles.container}>
        <CommonTop {...categoriesTopProps} />

        <CommonSelector {...categoriesSelectProps} />

        {categories && <CustomTable rows={categories} headers={tableHeaders} columns={columnNames} verifyButton = "active_status" />}
      </div>
    </>
  );
}

export default Categories;
