import React from "react";
import { useFormik } from "formik";
import {
  validateConfirmPassword,
  validateEmail,
  validateNik,
  validateNotEmpty,
  validateValue,
} from "helpers";
import useAuthStore from "stores/useAuthStore";
import "./styles.css";

export function AddUser() {
  const { register } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      nik: "",
      address: "",
      phoneNumber: "",
    },
    validateOnBlur: true,
    validate: (values) => {
      let errors = {};
      if (validateValue(values.email, validateNotEmpty)) {
        errors.email = "Email harus diisi";
      } else if (validateValue(values.email, validateEmail)) {
        errors.email = "Email tidak valid";
      }
      if (validateValue(values.password, validateNotEmpty)) {
        errors.password = "Kata sandi harus diisi";
      }
      if (validateValue(values.confirmPassword, validateNotEmpty)) {
        errors.confirmPassword = "Konfirmasi kata sandi harus diisi";
      } else if (
        validateConfirmPassword(values.password, values.confirmPassword)
      ) {
        errors.confirmPassword = "Konfirmasi kata sandi belum sesuai";
      }
      if (validateValue(values.name, validateNotEmpty)) {
        errors.name = "Nama lengkap harus diisi";
      }
      if (validateValue(values.nik, validateNotEmpty)) {
        errors.nik = "NIK harus diisi";
      } else if (validateValue(values.nik, validateNik)) {
        errors.nik = "NIK tidak valid";
      }
      if (!values.address) {
        errors.address = "Alamat harus diisi";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "Nomor hp harus diisi";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await register(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <section className="flex-1">
      <header className="header">
        <div className="header__container">
          <h1 className="label label-text font-bold">Add User</h1>
        </div>
      </header>
      <form className="form-users">
        <label
          htmlFor="name"
          className="label label-text label-users font-bold"
        >
          User Name
        </label>
        <div className="input-wrapper-users">
          <input
            id="name"
            name="name"
            type="text"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.name}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label htmlFor="nik" className="label label-text label-users font-bold">
          NIK
        </label>
        <div className="input-wrapper-users">
          <input
            id="nik"
            name="nik"
            type="text"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.nik}
          />
          {formik.errors.nik ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.nik}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label htmlFor="dob" className="label label-text label-users font-bold">
          Date of Birth
        </label>
        <div className="input-wrapper-users">
          <input
            id="dob"
            name="dob"
            type="date"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.dob}
          />
          {formik.errors.dob ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.dob}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="address"
          className="label label-text label-users font-bold"
        >
          Address
        </label>
        <div className="input-wrapper-users">
          <input
            id="address"
            name="address"
            type="text"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.errors.address ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.address}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="phoneNumber"
          className="label label-text label-users font-bold"
        >
          Phone Number
        </label>
        <div className="input-wrapper-users">
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.phoneNumber}</label>
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn"
          onClick={handleSubmit}
          disabled={
            formik.errors.name == "" ||
            formik.values.nik == "" ||
            formik.values.dob == "" ||
            formik.values.address == "" ||
            formik.values.phoneNumer == "" ||
            formik.isSubmitting
          }
        >
          Submit
        </button>
      </form>
    </section>
  );
}
