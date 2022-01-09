import { useRef, useState, useEffect } from "react";
import { Page, PageContent } from "components/layout/page";
import { idLocalCalendar } from "components/ui";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useFormik } from "formik";
import { validateNotEmpty, validateValue, validateNik } from "helpers";
import useAuthStore from "stores/useAuthStore";
import useCitizen from "hooks/user/useCitizen";
import { useHistory } from "react-router";

export function EditFamilyMember(props) {
  const data = props.location.state;

  const history = useHistory();
  if (!data) {
    history.push("/");
  }
  const { token } = useAuthStore();
  const birthday = new Date(data?.birthday);

  const [selectedDay, setSelectedDay] = useState({
    year: birthday.getFullYear(),
    month: birthday?.getMonth() + 1,
    day: birthday?.getDate(),
  });
  const dateEl = useRef(null);
  const { updateFamilyMember } = useCitizen();

  const formik = useFormik({
    initialValues: {
      ...data,
      token,
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
      await updateFamilyMember(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  const handleDate = (val) => {
    setSelectedDay(val);
    let date = new Date(
      `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`
    );
    let difference = Date.now() - date.getTime();

    let ageDate = new Date(difference);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    formik.setValues({ ...formik.values, birthday: date, age });
    console.log(formik.values.birthday);
  };

  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center font-primary sm:text-xl">
            Tambah Anggota Keluarga
          </h1>
          <div class="form-control space-y-1">
            <label class="label">
              <span class="font-bold label-text">NIK</span>
            </label>
            <input
              type="text"
              placeholder="15 Digit No KTP"
              class="input input-bordered"
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
            <label class="label">
              <span class="font-bold label-text">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="Budi Setiawan"
              class="input input-bordered"
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
            <label class="label">
              <span class="font-bold label-text">Jenis Kelamin</span>
            </label>
            <select
              class="select select-bordered w-full"
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
                value="Female "
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
            <label class="label">
              <span class="font-bold label-text">No. Telepon</span>
            </label>
            <input
              type="text"
              placeholder="081273823xxxx"
              class="input input-bordered"
              name="handphone"
              onChange={formik.handleChange}
              value={formik.values.handphone}
            />
            {formik.errors.handphone ? (
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
