import React, { useState } from "react";
import { useFormik } from "formik";
import "./Register.css";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Write password"
            onChange={formik.handleChange}
          />
        </div>
        <button className="register__btn">Submit</button>
      </form>
    </div>
  );
};

export default Register;
