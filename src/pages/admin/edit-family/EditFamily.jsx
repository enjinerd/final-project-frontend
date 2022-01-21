import { useFormik } from "formik";
import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";
import useAdmin from "../../../hooks/admin/useAdmin";

export function EditFamily() {
  const api = import.meta.env.VITE_API_HOST;
  const history = useHistory();
  const { token } = useAuthAdminStore();
  const { updateFamilyByHF, isLoading } = useAdmin();
  const validate = (values) => {
    const errors = {};
    if (!values.status) {
      errors.status = "Status can not be empty";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      status:
        history.location?.state === undefined
          ? "BELUM VAKSIN"
          : history.location.state?.status_vaccines,
    },
    validate,
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${api}/admin/family/${history.location.state.id}`,
        {
          status_vaccines: formik.values.status,
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
  };

  return (
    <section className="flex-1">
      <header className="header">
        <div className="header__container">
          <h1 className="label label-text font-bold">Edit Family Member</h1>
        </div>
      </header>
      <form className="form-vaccine">
        <label
          htmlFor="status"
          className="label label-text label-vaccine font-bold"
        >
          Status Vaccine
        </label>
        <div className="input-wrapper-vaccine">
          <select
            name="status"
            className="input input-bordered"
            onChange={formik.handleChange}
            value={formik.values.status}
          >
            <option value="BELUM VAKSIN">BELUM VAKSIN</option>
            <option value="DOSIS 1">DOSIS 1</option>
            <option value="DOSIS 2">DOSIS 2</option>
          </select>
          {formik.errors.status ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.status}</label>
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn"
          onClick={(e) => handleEdit(e)}
          disabled={formik.errors.status == "" || formik.isSubmitting}
        >
          Edit
        </button>
      </form>
    </section>
  );
}
