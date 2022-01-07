import { Page, PageContent } from "components/layout/page";
import { idLocalCalendar } from "components/ui";
import { useFormik } from "formik";
import { validateEmail, validateNotEmpty, validateValue } from "helpers";
import useCitizen from "hooks/user/useCitizen";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";

export function UserProfile() {
  const { token } = useAuthStore();

  const [selectedDay, setSelectedDay] = useState(null);
  const dateEl = useRef(null);
  const { updateProfile } = useCitizen();

  const formik = useFormik({
    initialValues: {
      address: "",
      birthday: "",
      token,
    },
    validateOnBlur: true,
    validate: (values) => {
      let errors = {};
      if (validateValue(values.address, validateNotEmpty)) {
        errors.address = "Alamat harus diisi";
      }
      if (validateValue(values.birthday, validateNotEmpty)) {
        errors.birthday = "Tanggal lahir tidak valid";
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
    formik.setValues({ ...formik.values, birthday: date });
  };
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center font-primary sm:text-xl">
            Data Diri
          </h1>
          <div className="space-y-1 form-control">
            <label className="label">
              <span className="font-bold label-text">Alamat Tinggal</span>
            </label>
            <input
              type="text"
              placeholder="Jalan Contoh No 1, Desa Contoh, Kota Semarang, Jawa Tengah"
              className="input input-bordered"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {formik.errors.email ? (
              <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
                <div className="flex-1">
                  <label>{formik.errors.address}</label>
                </div>
              </div>
            ) : null}
            <label className="label">
              <span className="font-bold label-text">Tanggal Lahir</span>
            </label>{" "}
            <DatePicker
              value={selectedDay}
              onChange={handleDate}
              inputClassName="input input-bordered w-full shadow-lg text-black"
              calendarClassName="text-sm sm:text-base"
              inputPlaceholder="Piilh Tanggal"
              calendarPopperPosition="bottom"
              locale={idLocalCalendar}
              shouldHighlightWeekends
            />
            {formik.errors.birthday ? (
              <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
                <div className="flex-1">
                  <label>{formik.errors.birthday}</label>
                </div>
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-block"
            onClick={handleSubmit}
            disabled={
              formik.errors.address ||
              formik.values.birthday == "" ||
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
