import React from "react";
import styles from "./Categories.module.css";
import Backdrop from "@mui/material/Backdrop";
import { ReactComponent as CloseIcon } from "../../asset/svg/close.svg";
import { useForm } from "react-hook-form";
import { getAllCategories, insertCategories } from "./apiCategories";

function CategoryForm({ setAddCategoryClicked, setCategories }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await insertCategories(data);
    getAllCategories(setCategories);
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={true}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>
          <h4>Add Category</h4>
          <span onClick={() => setAddCategoryClicked(false)}>
            <CloseIcon />
          </span>
        </div>

        <div className={styles.name}>
          <label htmlFor='name'>Category Name</label>
          <input id='name' placeholder='Fashion' {...register("category_name", { required: true })} />
        </div>

        <div className={styles.description}>
          <label htmlFor='description'>Category Description</label>
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

export default CategoryForm;
