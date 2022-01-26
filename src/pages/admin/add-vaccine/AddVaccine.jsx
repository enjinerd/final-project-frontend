import "./styles.css";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";

export function AddVaccine() {
  const api = import.meta.env.VITE_API_HOST;
  const history = useHistory();
  const { token } = useAuthAdminStore();

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
      name:
        history.location?.state === undefined
          ? ""
          : history.location.state?.name,
      stock:
        history.location?.state === undefined
          ? 0
          : history.location.state?.stock,
    },
    validate,
    onSubmit: async () => {
      await axios
        .post(
          `${api}/vaccines`,
          {
            name: formik.values.name,
            stock: formik.values.stock,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          history.push("/admin/vaccine");
        })
        .catch((error) => {
          return error;
        });
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleEdit = (id) => {
    axios
      .put(
        `${api}/vaccine/${id}`,
        {
          name: formik.values.name,
          stock: formik.values.stock,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        history.push("/admin/vaccine");
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <section className="flex-1">
      <header className="header">
        <div className="header__container">
          <h1 className="label label-text font-bold">Add Vaccine</h1>
        </div>
      </header>
      <form className="form-vaccine">
        <label
          htmlFor="name"
          className="label label-text label-vaccine font-bold"
        >
          Vaccine Name
        </label>
        <div className="input-wrapper-vaccine">
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
        <label
          htmlFor="stock"
          className="label label-text label-vaccine font-bold"
        >
          Stock
        </label>
        <div className="input-wrapper-vaccine">
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
              <div className="flex-1">
                <label>{formik.errors.stock}</label>
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn"
          onClick={
            history.location.state !== undefined
              ? () => handleEdit(history.location.state.id)
              : () => handleSubmit()
          }
          disabled={
            formik.errors.name == "" ||
            formik.values.stock == 0 ||
            formik.isSubmitting
          }
        >
          {history.location?.state === undefined ? "Submit" : "Edit"}
        </button>
      </form>
    </section>
  );
}
