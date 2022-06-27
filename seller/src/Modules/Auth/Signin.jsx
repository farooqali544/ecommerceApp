import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { loginSeller } from "./authApi";
import { ReactComponent as ErrorIcon } from "../../asset/svg/error.svg";
import { Tooltip } from "@mui/material";

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

function Signin({ setRememberUser }) {
  const sellerAuth = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const login = await loginSeller(data, sellerAuth);

    if (login?.errorCode === 1) return setError("email", { type: "custom", message: login.error });

    if (login?.errorCode === 2) return setError("password", { type: "custom", message: login.error });

    if (login.auth) {
      const loginDetails = { token: login.token, result: login.result };
      
      sellerAuth.login(loginDetails);
      navigate("/");
    }
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.img}></div>

      <div className={styles.signWrapper}>
        <form className={styles.signForm} onSubmit={handleSubmit(onSubmit)}>
          <h5>Account Login</h5>
          <span>Become a member and enjoy exclusive promotions.</span>

          <div className={styles.inputs}>
            <div className={styles.email}>
              <label className={errors.email && styles.errorLabel}>
                Email <ErrorSpan error={errors.email} />
              </label>
              <input
                type='text'
                placeholder='youremail@gmail.com'
                {...register("email", { required: "Required Field" })}
                id={errors.email && styles.errorInput}
              />
            </div>

            <div className={styles.password}>
              <label className={errors.password && styles.errorLabel}>
                Password <ErrorSpan error={errors.password} />
              </label>
              <input
                type='password'
                placeholder='password'
                {...register("password", { required: "Required Field" })}
                id={errors.password && styles.errorInput}
              />
            </div>

            <div className={styles.remember}>
              <input type='checkbox' id={styles.remember} {...register("remember")} defaultChecked />
              <label htmlFor={styles.remember}>Remember me</label>
            </div>

            <button type='submit'>Login</button>
          </div>

          <span className={styles.noAccount}>
            Don't have an account? <span onClick={() => navigate("/signup")}>Sign up here</span>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signin;
