import axios from "axios";
import { Page, PageContent } from "components/layout/page";
import { ConfirmDialog } from "components/ui";
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

export function SignUp() {
  const api = import.meta.env.VITE_API_HOST;
  const { register, error, isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Redirect to="/user" />;
  }

  const [isNext, setNext] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nik: "",
      gender: "",
      handphone_number: "",
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
      return errors;
    },
    onSubmit: async (values) => {
      setDone(false);
      await register(values);
      console.log(error);
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
    <Page>
      <PageContent>
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
            <div className="font-medium alert alert-success">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
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
            <div className="font-medium alert alert-error">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <label>Email atau NIK sudah terdaftar</label>
              </div>
            </div>
          )}

          {isNext ? (
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

              <label class="label">
                <span class="font-bold label-text">No. Telepon</span>
              </label>
              <input
                type="text"
                placeholder="081273823xxxx"
                class="input input-bordered"
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
            <div class="form-control space-y-1">
              <label class="label">
                <span class="font-bold label-text">E-mail</span>
              </label>
              <input
                type="text"
                placeholder="contoh@email.com"
                class="input input-bordered"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <div class="font-medium px-2 py-1 rounded-md text-red-600 text-sm">
                  <div class="flex-1">
                    <label>{formik.errors.email}</label>
                  </div>
                </div>
              ) : null}
              <label class="label">
                <span class="font-bold label-text">Kata Sandi</span>
              </label>
              <input
                type="password"
                placeholder="********"
                class="input input-bordered"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <div class="font-medium px-2 py-1 rounded-md text-red-600 text-sm">
                  <div class="flex-1">
                    <label>{formik.errors.password}</label>
                  </div>
                </div>
              ) : null}
              <label class="label">
                <span class="font-bold label-text">Konfirmasi Kata Sandi</span>
              </label>
              <input
                type="password"
                placeholder="********"
                class="input input-bordered"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword ? (
                <div class="font-medium px-2 py-1 rounded-md text-red-600 text-sm">
                  <div class="flex-1">
                    <label>{formik.errors.confirmPassword}</label>
                  </div>
                </div>
              ) : null}
            </div>
          )}
          {isNext ? (
            <>
              <button class="btn btn-block btn-info" onClick={handleNext}>
                Kembali
              </button>
              <div
                data-tip="Pastikan semua data terisi dengan benar"
                className="w-full tooltip"
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
              className="w-full tooltip"
            >
              <button
                class="btn btn-block btn-info"
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
      </PageContent>
    </Page>
  );
}
