import React, { useEffect, useState } from "react";
import styles from "./SubCategories.module.css";
import { ReactComponent as SearchIcon } from "../../asset/svg/search.svg";
import { ReactComponent as SettingIcon } from "../../asset/svg/setting.svg";
import { ReactComponent as OrderIcon } from "../../asset/svg/order.svg";
import SubCategoryForm from "./SubCategoryForm";
import { getAllCategories, getAllSubCategories, getSpecificSubCategories } from "./apiSubCategories";
import CustomTable from "../shared/Table/CustomTable";
import CommonTop from "../shared/CommonTop/CommonTop";
import CommonSelector from "../shared/CommonSelector/CommonSelector";

const options = ["All", "Active", "Supsended"];

const tableHeaders = ["SC.Id", "Name", "Category", "Description", "Status"];

const columnNames = ["sub_category_id", "sub_category_name", "category_name", "description", "active_status"];

function SubCategories() {
  const [addSubCategoryClicked, setAddSubCategoryClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategoryType, setSelectedSubCategoryType] = useState("All");

  useEffect(() => {
    getAllCategories(setCategories);
    getAllSubCategories(setSubCategories);
  }, []);

  const onChangeSubCategoriesType = (option) => {
    setSelectedSubCategoryType(option);

    if (option === "All") return getAllSubCategories(setSubCategories);

    if (option === "Active") return getSpecificSubCategories(1, setSubCategories);

    //suspended
    return getSpecificSubCategories(0, setSubCategories);
  };

  const subCategoriesTopProps = {
    title: "SubCategories",
    settingsClicked: addSubCategoryClicked,
    setSettingsClicked: setAddSubCategoryClicked,
    dataLength: subCategories.length,
  };

  const subCategoriesSelectProps = {
    options: options,
    selectedItemType: selectedSubCategoryType,
    onChangeItemType: onChangeSubCategoriesType,
  };

  return (
    <>
      {addSubCategoryClicked && (
        <SubCategoryForm setAddSubCategoryClicked={setAddSubCategoryClicked} categories={categories} setSubCategories={setSubCategories} />
      )}

      <div className={styles.container}>
        <CommonTop {...subCategoriesTopProps} />

        <CommonSelector {...subCategoriesSelectProps} />

        {subCategories && <CustomTable rows={subCategories} headers={tableHeaders} columns={columnNames} verifyButton = "active_status"/>}
      </div>
    </>
  );
}

export default SubCategories;
