import "./styles.css";
import { useFormik } from "formik";
import React from "react";

export function AddVaccine() {
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name can not be empty";
    }
    if (!values.stock) {
      errors.stock = "Stock can not be empty";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      stock: 0,
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="flex-1">
      <header className="header">
        <div className="header__container">
          <h1 className="label label-text font-bold">Add Vaccine</h1>
        </div>
      </header>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className="label label-text font-bold">
          Vaccine Name
        </label>
        <div className="input-wrapper">
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
              <div class="flex-1">
                <label>{formik.errors.name}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label htmlFor="stock" className="label label-text font-bold">
          Stock
        </label>
        <div className="input-wrapper">
          <input
            id="stock"
            name="stock"
            type="number"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.stock}
          />
          {formik.errors.stock ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div class="flex-1">
                <label>{formik.errors.stock}</label>
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          class="btn"
          disabled={
            formik.errors.name == "" ||
            formik.values.stock == 0 ||
            formik.isSubmitting
          }
        >
          Submit
        </button>
      </form>
    </section>
  );
}
