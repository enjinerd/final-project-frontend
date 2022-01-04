import { useEffect, useState, useRef } from "react";
import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validateEmail, validateNotEmpty, validateValue } from "helpers";
import { useHistory } from "react-router-dom";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { idLocalCalendar } from "components/ui";
import useCitizen from "hooks/user/useCitizen";

export function UserProfile() {
  const [selectedDay, setSelectedDay] = useState(null);
  const dateEl = useRef(null);
  const { updateProfile } = useCitizen();

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
    onSubmit: async (values) => {
      await updateProfile(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  const handleDate = (val) => {
    setSelectedDay(val);
    let date = new Date(`${val.year}-${val.month}-${val.day}`);
    console.log(date);
  };
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6   lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl font-primary">
            Data Diri
          </h1>
          <div className="form-control space-y-1">
            <label className="label">
              <span className="label-text font-bold">Alamat Tinggal</span>
            </label>
            <input
              type="text"
              placeholder="Jalan Contoh No 1, Desa Contoh, Kota Semarang, Jawa Tengah"
              className="input input-bordered"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                <div className="flex-1">
                  <label>{formik.errors.email}</label>
                </div>
              </div>
            ) : null}
            <label className="label">
              <span className="label-text font-bold">Tanggal Lahir</span>
            </label>{" "}
            <DatePicker
              value={selectedDay}
              onChange={handleDate}
              inputClassName="input input-bordered w-full shadow-lg"
              calendarClassName="text-sm sm:text-base"
              inputPlaceholder="Piilh Tanggal"
              calendarPopperPosition="bottom"
              locale={idLocalCalendar}
              shouldHighlightWeekends
            />
            {formik.errors.password ? (
              <div className="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                <div className="flex-1">
                  <label>{formik.errors.password}</label>
                </div>
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-block"
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
