import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";
import jwt_decode from "jwt-decode";
import useAdmin from "../../../hooks/admin/useAdmin";
import moment from "moment";
import "./styles.css";

export function AddHealthFacilitator() {
  const api = import.meta.env.VITE_API_HOST;
  const history = useHistory();
  const { token } = useAuthAdminStore();
  const { getVaccine, addVaccine, editVaccine, isLoading } = useAdmin();
  const decoded = jwt_decode(token);

  const validate = (values) => {
    const errors = {};
    if (!values.facilitatorName) {
      errors.facilitatorName = "Facilitator name can not be empty";
    }
    if (!values.email) {
      errors.email = "Email can not be empty";
    }
    if (!values.password) {
      errors.password = "Password can not be empty";
    }
    if (!values.address) {
      errors.address = "Address can not be empty";
    }
    if (!values.longitude) {
      errors.longitude = "Longtitude can not be empty";
    }
    if (isValidLatLong(values.longitude)) {
      errors.longitude = "Longtitude must be a number between -180 and 180";
    }
    if (!values.latitude) {
      errors.latitude = "Latitude can not be empty";
    }
    if (isValidLatLong(values.latitude)) {
      errors.latitude = "Latitude must be a number between -90 and 90";
    }
    if (!values.type) {
      errors.type = "Type can not be empty";
    }
    return errors;
  };

  const isValidLatLong = (pos) =>
    /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi.test(
      pos.toString()
    );
  const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;
  const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

  const formik = useFormik({
    initialValues: {
      facilitatorName:
        history.location?.state === undefined
          ? ""
          : history.location?.state.facilitatorName,
      email:
        history.location?.state === undefined
          ? ""
          : history.location?.state.email,
      password:
        history.location?.state === undefined
          ? ""
          : history.location.state?.password,
      address:
        history.location?.state === undefined
          ? ""
          : history.location.state?.address,
      longitude:
        history.location?.state === undefined
          ? ""
          : history.location.state?.longitude,
      latitude:
        history.location?.state === undefined
          ? ""
          : history.location.state?.latitude,
      type:
        history.location?.state === undefined
          ? ""
          : history.location.state?.type,
    },
    validate,
    onSubmit: async () => {
      await axios
        .post(
          `${api}/admin/registers`,
          {
            facilitator_name: formik.values.facilitatorName,
            email: formik.values.email,
            password: formik.values.password,
            address: formik.values.address,
            longitude: formik.values.longitude,
            latitude: formik.values.latitude,
            type: formik.values.type,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          history.push("/admin");
        })
        .catch((error) => {
          return error;
        });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const formatDate = (dateString) => {
    let a = moment(dateString);
    return a.format();
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    axios
      .put(
        `${api}/admin/${id}`,
        {
          facilitator_name: formik.values.facilitatorName,
          address: formik.values.address,
          longitude: formik.values.longitude,
          latitude: formik.values.latitude,
          type: formik.values.type,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        history.push("/admin");
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <section className="flex-1">
      <header className="header">
        <div className="header__container">
          <h1 className="label label-text font-bold">
            Register Health Facilitator
          </h1>
        </div>
      </header>
      <form className="form-hf">
        <label
          htmlFor="facilitatorName"
          className="label label-hf label-text font-bold"
        >
          Facilitator Name
        </label>
        <div className="input-wrapper-hf">
          <input
            id="facilitatorName"
            name="facilitatorName"
            type="text"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.facilitatorName}
          />
          {formik.errors.facilitatorName ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.facilitatorName}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label htmlFor="email" className="label label-hf label-text font-bold">
          Email
        </label>
        <div className="input-wrapper-hf">
          <input
            id="email"
            name="email"
            type="text"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.email}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="password"
          className="label label-hf label-text font-bold"
        >
          Password
        </label>
        <div className="input-wrapper-hf">
          <input
            id="password"
            name="password"
            type="text"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.password}</label>
              </div>
            </div>
          ) : null}
        </div>
        <label
          htmlFor="address"
          className="label label-hf label-text font-bold"
        >
          Address
        </label>
        <div className="input-wrapper-hf">
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
          htmlFor="longitude"
          className="label label-hf label-text font-bold"
        >
          Longtitude
        </label>
        <div className="input-wrapper-hf">
          <input
            id="longitude"
            name="longitude"
            type="number"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.longitude}
          />
          {formik.errors.longitude ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.longitude}</label>
              </div>
            </div>
          ) : null}
        </div>

        <label
          htmlFor="latitude"
          className="label label-hf label-text font-bold"
        >
          Latitude
        </label>
        <div className="input-wrapper-hf">
          <input
            id="latitude"
            name="latitude"
            type="number"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.latitude}
          />
          {formik.errors.latitude ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.latitude}</label>
              </div>
            </div>
          ) : null}
        </div>

        <label htmlFor="type" className="label label-hf label-text font-bold">
          Type
        </label>
        <div className="input-wrapper-hf">
          <select
            name="type"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option value="Rumah Sakit">Rumah Sakit</option>
            <option value="Klinik">Klinik</option>
          </select>
          {formik.errors.type ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.type}</label>
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn"
          onClick={
            history.location.state
              ? (e) => handleEdit(e, token.user_id)
              : (e) => handleSubmit(e)
          }
          disabled={
            formik.errors.facilitatorName == "" ||
            formik.values.email == "" ||
            formik.values.password == "" ||
            formik.values.longitude == 0 ||
            formik.values.address == "" ||
            formik.values.latitude == 0 ||
            formik.values.type == "" ||
            formik.isSubmitting
          }
        >
          Submit
        </button>
      </form>
    </section>
  );
}
