import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        console.log("Successfull login");

        toast.success("Logged in successfully", {
          position: "top-right",
        });

        navigate("/profile");
      } catch (error) {
        console.log(error.message);

        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    },
  });
  return (
    <div>
      <h3 className="login__title">Login</h3>
      <form onSubmit={formik.handleSubmit} className="login__form">
        <div className="form__component">
          <label htmlFor="email">Email Address:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form__component">
          <label htmlFor="email">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Write password"
            onChange={formik.handleChange}
          />
        </div>
        <button className="login__btn">Log in</button>
      </form>
      <p className="register__subtitle">
        Don't have an account?
        <Link to="/" className="register-link">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
