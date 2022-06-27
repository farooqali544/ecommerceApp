import React from "react";
import styles from "./Auth.module.css";
import { ReactComponent as BackArrowIcon } from "../../asset/svg/backArrow.svg";
import { ReactComponent as ErrorIcon } from "../../asset/svg/error.svg";
import { useForm } from "react-hook-form";
import { citiesList } from "./citiesList";
import { Tooltip } from "@mui/material";
import { addSeller, verifyEmail, verifyUsername } from "./authApi";
import { useNavigate } from "react-router-dom";

const ErrorSpan = ({ error }) => {
  if (error)
    return (
      <Tooltip title={error.message} enterDelay={0} placement={"top"}>
        <span>
          <ErrorIcon width={20} heigth={20} />
        </span>
      </Tooltip>
    );
};

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const usernameVerified = await verifyUsername(data);
    const emailVerified = await verifyEmail(data);

    if (!emailVerified || !usernameVerified) {
      if (!usernameVerified) setError("username", { type: "custom", message: "Username already found, please choose another one" });

      if (!emailVerified) setError("email", { type: "custom", message: "Email already found, please choose another one" });
      return;
    }
    const insertData = {
      first_name: data.firstName,
      last_name: data.lastName,
      address: data.address,
      city: data.city,
      country: "Pakistan",
      phone: data.phone,
      photo: null,
      dob: data.dob,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    addSeller(insertData);
  };

  const navigate = useNavigate();

  const onBackButton = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.img}></div>

      <div className={styles.signWrapper}>
        {/* Absolute POstion */}
        <div className={styles.backArrow} onClick={onBackButton}>
          <BackArrowIcon width={18} height={18} /> Back
        </div>

        <form className={styles.signForm} onSubmit={handleSubmit(onSubmit)}>
          <h5>Account Signup</h5>
          <span>Become a member and enjoy exclusive promotions.</span>

          <div className={styles.inputs}>
            <div className={styles.splitInputs}>
              <div className={styles.firstName}>
                <label className={errors.firstName && styles.errorLabel}>
                  First Name <ErrorSpan error={errors.firstName} />
                </label>

                <input
                  type='text'
                  placeholder='Farooq'
                  {...register("firstName", { required: "Required Field" })}
                  id={errors.firstName && styles.errorInput}
                />
              </div>

              <div className={styles.lastname}>
                <label className={errors.lastname && styles.errorLabel}>
                  Last Name <ErrorSpan error={errors.firstName} />{" "}
                </label>

                <input
                  type='text'
                  placeholder='Ali'
                  {...register("lastName", { required: "Required Field" })}
                  id={errors.lastName && styles.errorInput}
                />
              </div>
            </div>

            <div className={styles.username}>
              <label className={errors.username && styles.errorLabel}>Username {errors.username && <ErrorSpan error={errors.username} />}</label>

              <input
                type='text'
                placeholder='Farooq54455'
                {...register("username", { required: "Required Field" })}
                id={errors.username && styles.errorInput}
              />
            </div>

            <div className={styles.email}>
              <label className={errors.email && styles.errorLabel}>Email Address {errors.email && <ErrorSpan error={errors.email} />}</label>
              <input
                type='text'
                placeholder='youremail@gmail.com'
                {...register("email", { required: "Required Field" })}
                id={errors.email && styles.errorInput}
              />
            </div>

            <div className={styles.password}>
              <label className={errors.password && styles.errorLabel}>Password {errors.password && <ErrorSpan error={errors.password} />}</label>
              <input
                type='password'
                placeholder='password'
                {...register("password", { required: "Required Field" })}
                id={errors.password && styles.errorInput}
              />
            </div>

            <div className={styles.phoneNo}>
              <label className={errors.phoneNo && styles.errorLabel}>Phone No {errors.phoneNo && <ErrorSpan error={errors.phoneNo} />}</label>
              <input
                type='text'
                placeholder='0301 9055614'
                {...register("phone", { required: "Required Field" })}
                id={errors.phoneNo && styles.errorInput}
              />
            </div>

            <div className={styles.city}>
              <label className={errors.city && styles.errorLabel}>City {errors.city && <ErrorSpan error={errors.city} />}</label>
              <select defaultValue={"Islamabad"} {...register("city", { required: "Required Field" })}>
                {citiesList.map((city) => (
                  <option key={city.name}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.address}>
              <label className={errors.address && styles.errorLabel}>Address {errors.address && <ErrorSpan error={errors.address} />}</label>
              <input
                type='text'
                placeholder='Bharakahu, Islamabad'
                {...register("address", { required: "Required Field" })}
                id={errors.address && styles.errorInput}
              />
            </div>

            <div className={styles.dob}>
              <label className={errors.dob && styles.errorLabel} htmlFor='dob'>
                Date of Birth {errors.dob && <ErrorSpan error={errors.dob} />}
              </label>
              <input type='date' id={errors.dob ? styles.errorInput : styles.dob} {...register("dob", { required: "Required Field" })} />
            </div>

            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
