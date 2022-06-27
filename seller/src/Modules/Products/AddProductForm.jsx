import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import Backdrop from "@mui/material/Backdrop";
import { ReactComponent as CloseIcon } from "../../asset/svg/close.svg";
import { useForm } from "react-hook-form";
import { addPhotos, addProduct, getAllProducts, getAllSubCategories } from "./apiProducts";
import { useAuth } from "../../utils/auth";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function AddProductForm({ setAddProductClicked, setProducts }) {
  const [subCategories, setSubCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [loadingThumbnail, setLoadingThumbnail] = useState(false);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [photos, setPhotos] = useState(null);

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllSubCategories(setSubCategories, reset);
  }, []);

  const uploadImage = (e) => {
    //check file size
    const files = e.target.files;
    if (files[0].size < 512000) {
      setThumbnail(files[0]);
    } else {
      alert("File Size Must Be less than 1 mb");
      e.target.value = null;
    }
  };

  const uploadMultiplePhotos = (e) => {
    //check file size
    const files = e.target.files;
    // console.log(files);
    setPhotos(files);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const insertData = { ...data, seller_id: user.id, thumbnail: null };

    let thumbnailLink = [];
    //Upload Thumbnail
    if (thumbnail != null) {
      setLoadingThumbnail(true);
      const fileName = thumbnail.name;

      const imageRef = ref(storage, `products/${fileName + v4()}`);
      await uploadBytes(imageRef, thumbnail).then(async (resp) => {
        await getDownloadURL(imageRef).then((response) => {
          setLoadingThumbnail(false);
          insertData.thumbnail = response;
        });
      });
    }

    const result = await addProduct({ ...insertData });

    if (photos && photos.length > 0) {
      let tempPics = [];
      setLoadingPhotos(true);

      for (let i = 0; i < photos.length; i++) {
        let image = photos[i];
        const fileName = image.name;
        const imageRef = ref(storage, `products/${fileName + v4()}`);
        await uploadBytes(imageRef, image).then(async (resp) => {
          await getDownloadURL(imageRef).then((resp) => {
            tempPics.push(resp);
            if (i === photos.length - 1) setLoadingPhotos(false);
          });
        });
      }

      await addPhotos(result.product, tempPics);
    }

    getAllProducts(user.id, setProducts);
  };

  const SubmitButton = () => {
    if (loadingThumbnail) return <button>Wait, Uploading Thumbnail</button>;

    if (loadingPhotos) return <button>Wait, Uploading Photos</button>;

    return <button type='submit'>SUBMIT</button>;
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={true}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>
          <h4>Add Product</h4>
          <span onClick={() => setAddProductClicked(false)}>
            <CloseIcon />
          </span>
        </div>

        <div className={styles.subcategoryPicker}>
          <label>Select Sub Category</label>
          <select {...register("sub_category_id")}>
            {subCategories.map((item) => (
              <option value={item.sub_category_id} key={item.sub_category_id}>
                {item.sub_category_name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.name}>
          <label htmlFor='name'>Product Name</label>
          <input id='name' placeholder='Redmi Note 10' {...register("product_name", { required: true })} />
        </div>

        <div className={styles.thumbnail}>
          <label>Product Thumbnail (less than 500kb)</label>
          <input accept='.JPEG,.JPG,.png' onChange={uploadImage} type='file' name='thumbnail' />
        </div>

        <div className={styles.photos}>
          <label>Product Photos (Max 5 photos)</label>
          <input accept='.JPEG,.JPG,.png' onChange={uploadMultiplePhotos} multiple type='file' name='photos' />
        </div>

        <div className={styles.description}>
          <label htmlFor='description'>Product Description</label>
          <textarea id='description' placeholder='lorem Ipusm' {...register("product_description", { required: true })} />
        </div>

        <div className={styles.multipleInputs}>
          <div className={styles.unitPrice}>
            <label>Unit Price</label>
            <input placeholder='30000' type='number' {...register("unit_price", { required: true })} />
          </div>

          <div className={styles.size}>
            <label>Unit Size</label>
            <input placeholder='6.1 Inches' {...register("size", { required: true })} />
          </div>

          <div className={styles.color}>
            <label>Item Color</label>
            <input type='color' {...register("color", { required: true })} />
          </div>
        </div>

        <div className={styles.multipleInputs}>
          <div className={styles.unitWeight}>
            <label>Unit Weight (in gm)</label>
            <input placeholder='164' type='number' {...register("unit_weight", { required: true })} />
          </div>

          <div className={styles.unitsInStock}>
            <label>Units in Stock</label>
            <input placeholder='25' type='number' {...register("units_in_stock", { required: true })} />
          </div>
        </div>

        <div className={styles.status}>
          <label>Active Status</label>
          <select {...register("status", { required: true })}>
            <option value={1}>Active</option>
            <option value={0}>InActive</option>
          </select>
        </div>

        <SubmitButton />
      </form>
    </Backdrop>
  );
}

export default AddProductForm;
