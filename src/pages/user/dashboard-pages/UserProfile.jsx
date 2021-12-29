import { useEffect, useState } from "react";
import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validateEmail, validateNotEmpty, validateValue } from "helpers";
import { useHistory } from "react-router-dom";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

export function UserProfile() {
  const [date, setDate] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      return errors;
    },
    onSubmit: async (values) => {},
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  const handleDateChange = (val) => {
    console.log(val);
  };
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 md:grid lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl font-primary">
            Data Diri
          </h1>
          <div class="form-control space-y-1">
            <label class="label">
              <span class="label-text font-bold">Alamat Tinggal</span>
            </label>
            <input
              type="text"
              placeholder="contoh@email.com"
              class="input input-bordered"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div class="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                <div class="flex-1">
                  <label>{formik.errors.email}</label>
                </div>
              </div>
            ) : null}
            <label class="label">
              <span class="label-text font-bold">Tanggal Lahir</span>
            </label>
            <DatePicker
              className="w-full"
              value={date}
              inputPlaceholder="Pilih tanggal"
              onChange={handleDateChange} //only when value has changed
            />
            {formik.errors.password ? (
              <div class="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                <div class="flex-1">
                  <label>{formik.errors.password}</label>
                </div>
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            class="btn btn-block"
            onClick={handleSubmit}
            disabled={
              formik.errors.email ||
              formik.values.password == "" ||
              formik.isSubmitting
            }
          >
            Perbarui Data
          </button>
        </div>
      </PageContent>
    </Page>
  );
}
