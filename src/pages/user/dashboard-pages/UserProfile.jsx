import { Page, PageContent } from "components/layout/page";
import { idLocalCalendar } from "components/ui";
import { useFormik } from "formik";
import { validateNotEmpty, validateValue, validateNik } from "helpers";
import useCitizen from "hooks/user/useCitizen";
import { useEffect, useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import useAuthStore from "stores/useAuthStore";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import { Breadcrumbs } from "components/user";

export function UserProfile() {
  const { token } = useAuthStore();
  const [selectedDay, setSelectedDay] = useState(null);
  const { updateProfile, userProfile } = useCitizen();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      birthday: "",
      name: "",
      nik: "",
      gender: "",
      handphone_number: "",
      age: "",
    },
    validateOnBlur: true,
    validate: (values) => {
      let errors = {};

      if (validateValue(values.name, validateNotEmpty)) {
        errors.name = "Nama harus diisi";
      }
      if (validateValue(values.nik, validateNotEmpty)) {
        errors.nik = "NIK harus diisi";
      } else if (validateValue(values.nik, validateNik)) {
        errors.nik = "NIK tidak valid";
      }
      if (validateValue(values.gender, validateNotEmpty)) {
        errors.gender = "Jenik Kelamin harus dipilih";
      }
      if (validateValue(values.handphone, validateNotEmpty)) {
        errors.handphone = "No. Telepon harus diisi";
      }
      if (validateValue(values.birthday, validateNotEmpty)) {
        errors.birthday = "Tanggal harus diisi";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await updateProfile(values, token);
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
  useEffect(async () => {
    const decode = jwt_decode(token);
    console.log(history);

    const data = await userProfile(token, decode?.user_id);
    const birthday = new Date(data?.birthday);
    setSelectedDay({
      year: birthday.getFullYear(),
      month: birthday?.getMonth() + 1,
      day: birthday?.getDate(),
    });
    formik.setValues({
      ...formik.values,
      name: data.name,
      nik: data.nik,
      address: data.address,
      birthday: data.birthday,
      handphone_number: data.handphone_number,
    });
  }, []);

  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center font-primary sm:text-xl">
            Perbarui Data Diri
          </h1>
          <div className="space-y-1 form-control">
            <label className="label">
              <span className="font-bold label-text">NIK</span>
            </label>
            <input
              type="text"
              placeholder="15 Digit No KTP"
              className="input input-bordered"
              name="nik"
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
            <label className="label">
              <span className="font-bold label-text">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="Budi Setiawan"
              className="input input-bordered"
              name="name"
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
            <label className="label">
              <span className="font-bold label-text">Jenis Kelamin</span>
            </label>
            <select
              className="w-full select select-bordered"
              onChange={formik.handleChange}
              name="gender"
            >
              <option disabled="disabled" selected>
                Pilih Jenis Kelamin
              </option>
              <option value="Male" selected={formik.values?.gender == "Male"}>
                Laki - Laki
              </option>
              <option
                value="Female"
                selected={formik.values?.gender == "Female"}
              >
                Perempuan
              </option>
            </select>
            {formik.errors.gender ? (
              <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
                <div className="flex-1">
                  <label>{formik.errors.gender}</label>
                </div>
              </div>
            ) : null}
            <label className="label">
              <span className="font-bold label-text">Tanggal Lahir</span>
            </label>{" "}
            <DatePicker
              value={selectedDay}
              onChange={handleDate}
              inputClassName="input input-bordered w-full shadow-lg text-black font-bold"
              calendarClassName="text-sm sm:text-base"
              inputPlaceholder="Piilh Tanggal"
              calendarPopperPosition="top"
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
            <label className="label">
              <span className="font-bold label-text">No. Telepon</span>
            </label>
            <input
              type="text"
              placeholder="081273823xxxx"
              className="input input-bordered"
              name="handphone_number"
              onChange={formik.handleChange}
              value={formik.values.handphone_number}
            />
            {formik.errors.handphone_number ? (
              <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
                <div className="flex-1">
                  <label>{formik.errors.handphone}</label>
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
              formik.errors.birthday ||
              formik.errors.name ||
              formik.errors.address ||
              formik.errors.gender ||
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
