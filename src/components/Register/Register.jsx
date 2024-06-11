import React, { useState } from "react";
import { useFormik } from "formik";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, updateProfile } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        // const user = auth.currentUser;
        console.log(user);

        await updateProfile(user, {
          name: values.name,
        });

        const registrationDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // if (user) {
        await setDoc(doc(firestore, "Users", user.uid), {
          email: values.email,
          password: values.password,
          name: values.name,
          registrationDate: registrationDate,
        });
        // }

        toast.success("Successfully registered", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: "top-right",
        });
      }
    },
  });

  return (
    <div>
      <h3 className="register__title">Register</h3>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__component">
          <label htmlFor="email">Name:</label>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="Veronika"
            onChange={formik.handleChange}
          />
        </div>
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
          <p className="register-sym">At least 6 symbols</p>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Write password"
            onChange={formik.handleChange}
          />
        </div>
        <button className="register__btn">Register</button>
      </form>

      <p className="register__subtitle">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
