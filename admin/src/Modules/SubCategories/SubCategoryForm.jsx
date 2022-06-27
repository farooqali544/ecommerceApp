import React from "react";
import styles from "./SubCategories.module.css";
import { Backdrop } from "@mui/material";
import { useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../../asset/svg/close.svg";
import { getAllSubCategories, insertSubCategories } from "./apiSubCategories";

function SubCategoryForm({ setAddSubCategoryClicked, categories, setSubCategories }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await insertSubCategories(data);
    getAllSubCategories(setSubCategories);
    console.log(data);
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={true}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>
          <h4>Add Sub Category</h4>
          <span onClick={() => setAddSubCategoryClicked(false)}>
            <CloseIcon />
          </span>
        </div>

        {/* 
        <div className={styles.image}>
          <input type='file' />
        </div> */}

        <div className={styles.categoryPicker}>
          <label htmlFor='categoryPicker'>Select Category</label>
          <select id='categoryPicker' {...register("category_id")}>
            {categories.map((category) => (
              <option value={category.category_id}> {category.category_name} </option>
            ))}
          </select>
        </div>

        <div className={styles.name}>
          <label htmlFor='name'>Sub Category Name</label>
          <input id='name' placeholder='Fashion' {...register("sub_category_name", { required: true })} />
        </div>

        <div className={styles.description}>
          <label htmlFor='description'>Sub Category Description</label>
          <textarea id='description' placeholder='lorem Ipusm' {...register("description", { required: true })} />
        </div>

        <div className={styles.status}>
          <label htmlFor='status'>Active Status</label>
          <select {...register("active_status", { required: true })}>
            <option value={1}>Active</option>
            <option value={0}>InActive</option>
          </select>
        </div>

        <button type='submit'>SUBMIT</button>
      </form>
    </Backdrop>
  );
}

export default SubCategoryForm;
