import { ConfirmDialog } from "components/ui";
import { useFormik } from "formik";
import {
  validateConfirmPassword,
  validateEmail,
  validateNotEmpty,
  validateValue,
} from "helpers";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";

export function SignUp() {
  const { register, error, isAuthenticated } = useAuthAdminStore();

  if (isAuthenticated) {
    return <Redirect to="/admin/vaccine" />;
  }

  const [isNext, setNext] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      faciliator_name: "",
      address: "",
      longtitude: "",
      latitude: "",
      type: "",
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
      if (!values.facilitator_name) {
        errors.facilitator_name = "Nama health facilitator harus diisi";
      }
      if (!values.address) {
        errors.address = "Alamat harus diisi";
      }
      if (!values.longtitude) {
        errors.longitude = "Longtitude harus diisi";
      }
      if (!values.latitude) {
        errors.latitude = "Latitude harus diisi";
      }
      if (!values.type) {
        errors.type = "Tipe harus diisi";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setDone(false);
      await register(values);
    },
  });
  const handleNext = () => {
    setNext(!isNext);
  };
  const handleSubmit = () => {
    formik.handleSubmit();
    setOpen(false);
  };
  return (
    <div className="px-4 py-8 space-y-6 lg:px-8" style={{ flex: "1 1 0%" }}>
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
              Akun anda berhasil dibuat, silahkan masuk untuk melakukan proses
              selanjutnya
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
            <label>Email sudah terdaftar</label>
          </div>
        </div>
      )}

      {isNext ? (
        <div className="form-control space-y-1">
          <label className="label">
            <span className="label-text font-bold">
              Nama Health Facilitator
            </span>
          </label>
          <input
            type="text"
            placeholder="Nama health facilitator"
            className="input input-bordered"
            name="facilitator_name"
            onChange={formik.handleChange}
            value={formik.values.facilitator_name}
          />
          {formik.errors.facilitator_name ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.facilitator_name}</label>
              </div>
            </div>
          ) : null}
          <label className="label">
            <span className="label-text font-bold">Alamat</span>
          </label>
          <input
            type="text"
            placeholder="Alamat health facilitator"
            className="input input-bordered"
            name="address"
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
          <label className="label">
            <span className="label-text font-bold">Tipe</span>
          </label>
          <input
            type="text"
            placeholder="Tipe health facilitator"
            className="input input-bordered"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          />
          {formik.errors.type ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.type}</label>
              </div>
            </div>
          ) : null}
          <label className="label">
            <span className="label-text font-bold">Longtitude</span>
          </label>
          <input
            type="text"
            placeholder="Longtitude health facilitator"
            className="input input-bordered"
            name="longtitude"
            onChange={formik.handleChange}
            value={formik.values.longtitude}
          />
          {formik.errors.longtitude ? (
            <div className="px-2 py-1 text-sm font-medium text-red-600 rounded-md">
              <div className="flex-1">
                <label>{formik.errors.longtitude}</label>
              </div>
            </div>
          ) : null}
          <label className="label">
            <span className="label-text font-bold">Latitude</span>
          </label>
          <input
            type="text"
            placeholder="Latitude health facilitator"
            className="input input-bordered"
            name="latitude"
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
            <span className="label-text font-bold">Konfirmasi Kata Sandi</span>
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
                formik.errors.name ||
                formik.values.nik == ""
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
            disabled={
              formik.errors.email ||
              formik.errors.confirmPassword ||
              formik.values.password == ""
            }
          >
            Daftar
          </button>
        </div>
      )}
    </div>
  );
}
