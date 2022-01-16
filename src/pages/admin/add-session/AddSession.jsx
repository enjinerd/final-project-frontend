import { useFormik } from "formik";
import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";
import "./styles.css";

export function AddSession() {
  const api = import.meta.env.VITE_API_HOST;
  const history = useHistory();
  const { token } = useAuthAdminStore();

  const validate = (values) => {
    const errors = {};
    if (!values.startDate) {
      errors.name = "Start date can not be empty";
    }
    if (!values.endDate) {
      errors.stock = "End date can not be empty";
    }
    if (!values.vaccine) {
      errors.stock = "Vaccine can not be empty";
    }
    if (!values.quota) {
      errors.stock = "Quota can not be empty";
    }
    if (!values.sessionType) {
      errors.stock = "Session Type can not be empty";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      vaccine: 1,
      quota: 0,
      sessionType: 1,
    },
    validate,
    onSubmit: async () => {
      await axios
        .post(
          `${api}/vaccine/sessions`,
          {
            start_date: formik.values.startDate,
            end_date: formik.values.endDate,
            vaccine_id: formik.values.vaccine,
            quota: formik.values.quota,
            session_type: formik.values.sessionType,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          history.push("/admin/session");
        })
        .catch((error) => {
          return error;
        });
    },
  });

  useEffect(() => {
    console.log(formik.values.startDate);
  }, [formik.values.startDat]);

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <section className="flex-1">
      <header className="header">
        <div className="header__container">
          <h1 className="label label-text font-bold">Add Vaccine Session</h1>
        </div>
      </header>
      <form className="form-session">
        <label
          htmlFor="startDate"
          className="label label-session label-text font-bold"
        >
          Start Date
        </label>
        <div className="input-wrapper-session">
          <input
            id="startDate"
            name="startDate"
            type="date"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
          {formik.errors.startDate ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.startDate}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="endDate"
          className="label label-session label-text font-bold"
        >
          End Date
        </label>
        <div className="input-wrapper-session">
          <input
            id="endDate"
            name="endDate"
            type="date"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.endDate}
          />
          {formik.errors.endDate ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.endDate}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="vaccine"
          className="label label-session label-text font-bold"
        >
          Vaccine
        </label>
        <div className="input-wrapper-session">
          <select
            name="vaccine"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.vaccine}
          >
            <option value="1">Sinovac</option>
            <option value="2">Astra</option>
            <option value="3">Moderna</option>
          </select>
          {formik.errors.vaccine ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.vaccine}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="quota"
          className="label label-session label-text font-bold"
        >
          Quota
        </label>
        <div className="input-wrapper-session">
          <input
            id="quota"
            name="quota"
            type="number"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.quota}
          />
          {formik.errors.quota ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.quota}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="sessionType"
          className="label label-session label-text font-bold"
        >
          Session Type
        </label>
        <div className="input-wrapper-session">
          <select
            name="sessionType"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.sessionType}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          {formik.errors.sessionType ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.sessionType}</label>
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn"
          onClick={() => handleSubmit()}
          disabled={
            formik.errors.startDate == "" ||
            formik.values.endDate == "" ||
            formik.values.quota == 0 ||
            formik.values.sessionType == "" ||
            formik.values.vaccine == 0 ||
            formik.isSubmitting
          }
        >
          Submit
        </button>
      </form>
    </section>
  );
}
