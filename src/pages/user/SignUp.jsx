import { Page, PageContent } from "components/layout/page";
import { ConfirmDialog, idLocalCalendar } from "components/ui";
import { useFormik } from "formik";
import {
  validateConfirmPassword,
  validateEmail,
  validateNik,
  validateNotEmpty,
  validateValue,
} from "helpers";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";
import DatePicker from "react-modern-calendar-datepicker";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function SignUp() {
  const { register, error, isAuthenticated } = useAuthStore();
  const [selectedDay, setSelectedDay] = useState(null);

  if (isAuthenticated) {
    return <Redirect to="/user" />;
  }

  const [isNext, setNext] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
      if (validateValue(values.email, validateNotEmpty)) {
        errors.email = "Email harus diisi";
      } else if (validateValue(values.email, validateEmail)) {
        errors.email = "Email tidak valid";
      }
      if (validateValue(values.password, validateNotEmpty)) {
        errors.password = "Kata sandi harus diisi";
      }
      if (validateValue(values.confirmPassword, validateNotEmpty)) {
        errors.confirmPassword = "Konfirmasi kata sandi harus diisi";
      } else if (
        validateConfirmPassword(values.password, values.confirmPassword)
      ) {
        errors.confirmPassword = "Konfirmasi kata sandi belum sesuai";
      }
      if (validateValue(values.name, validateNotEmpty)) {
        errors.name = "Nama lengkap harus diisi";
      }
      if (validateValue(values.nik, validateNotEmpty)) {
        errors.nik = "NIK harus diisi";
      } else if (validateValue(values.nik, validateNik)) {
        errors.nik = "NIK tidak valid";
      }
      if (validateValue(values.gender, validateNotEmpty)) {
        errors.gender = "Jenik Kelamin harus dipilih";
      }
      if (validateValue(values.handphone_number, validateNotEmpty)) {
        errors.handphone_number = "No. Telepon harus diisi";
      }
      if (validateValue(values.name, validateNotEmpty)) {
        errors.name = "Nama harus diisi";
      }
      if (validateValue(values.birthday, validateNotEmpty)) {
        errors.birthday = "Tanggal harus diisi";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setDone(false);
      await register(values);
      toast.success("Akun berhasil dibuat, anda sudah bisa masuk dan login.");
    },
  });
  /**
   * The function sets the next variable to the opposite of its current value.
   */
  const handleNext = () => {
    setNext(!isNext);
  };
  const handleSubmit = () => {
    formik.handleSubmit();
    setOpen(false);
  };

  const handleDate = (val) => {
    setSelectedDay(val);
    let date = new Date(`${val.year}-${val.month}-${val.day}`);
    let difference = Date.now() - date.getTime();

    let ageDate = new Date(difference);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    formik.setValues({ ...formik.values, birthday: date, age });
  };

  return (
    <Page>
      <PageContent>
        <Toaster />
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl">Daftar</h1>
          <h1 className="text-base text-center sm:text-xl">
            Sudah punya akun?{" "}
            <span className="italic font-bold">
              {" "}
              <Link to="/user/login">Masuk</Link>
            </span>
          </h1>
          {isDone && (
            <div className="alert alert-success font-medium">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2 w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <label>
                  Akun anda berhasil dibuat, silahkan masuk untuk melakukan
                  proses selanjutnya
                </label>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-error font-medium">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2 w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <label>Email atau NIK sudah terdaftar</label>
              </div>
            </div>
          )}

          {isNext ? (
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-bold">NIK</span>
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
                <span className="label-text font-bold">Nama Lengkap</span>
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
                <span className="label-text font-bold">Jenis Kelamin</span>
              </label>
              <select
                className="select select-bordered w-full"
                onChange={formik.handleChange}
                name="gender"
              >
                <option disabled="disabled" selected>
                  Pilih Jenis Kelamin
                </option>
                <option value="Male">Laki - Laki</option>
                <option value="Female">Perempuan</option>
              </select>
              {formik.errors.gender ? (
                <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
                  <div className="flex-1">
                    <label>{formik.errors.gender}</label>
                  </div>
                </div>
              ) : null}
              <label className="label">
                <span className="label-text font-bold">Tanggal Lahir</span>
              </label>{" "}
              <DatePicker
                value={selectedDay}
                onChange={handleDate}
                inputClassName="input input-bordered w-full shadow-lg text-black font-bold"
                calendarClassName="text-sm sm:text-base"
                inputPlaceholder="Pilih Tanggal"
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
                <span className="label-text font-bold">No. Telepon</span>
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
                    <label>{formik.errors.handphone_number}</label>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-bold">E-mail</span>
              </label>
              <input
                type="text"
                placeholder="contoh@email.com"
                className="input input-bordered"
                name="email"
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
              <label className="label">
                <span className="label-text font-bold">Kata Sandi</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered"
                name="password"
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
              <label className="label">
                <span className="label-text font-bold">
                  Konfirmasi Kata Sandi
                </span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword ? (
                <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
                  <div className="flex-1">
                    <label>{formik.errors.confirmPassword}</label>
                  </div>
                </div>
              ) : null}
            </div>
          )}
          {isNext ? (
            <>
              <button className="btn btn-block btn-info" onClick={handleNext}>
                Kembali
              </button>
              <div
                data-tip="Pastikan semua data terisi dengan benar"
                className="tooltip w-full"
              >
                <ConfirmDialog
                  isOpen={isOpen}
                  setOpen={setOpen}
                  handleConfirm={handleSubmit}
                  title="Konfirmasi Data"
                  message="Apakah anda benar-benar mengisi data sesuai dengan KTP yang anda miliki?"
                  titleAction="Konfirmasi"
                  className="btn btn-block"
                  disabled={
                    formik.isSubmitting ||
                    isDone ||
                    formik.errors.nik ||
                    formik.errors.name
                  }
                />
              </div>
            </>
          ) : (
            <div
              data-tip="Pastikan semua data terisi dengan benar"
              className="tooltip w-full"
            >
              <button
                className="btn btn-block btn-info"
                onClick={handleNext}
                disabled={formik.errors.email || formik.errors.confirmPassword}
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </PageContent>
    </Page>
  );
}
