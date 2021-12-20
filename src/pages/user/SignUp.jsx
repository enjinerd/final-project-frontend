import { useState } from "react";
import { useFormik } from "formik";
import { Page, PageContent } from "@/components/layout/page";
import { Link } from "react-router-dom";
import { ConfirmDialog } from "@/components/ui";
import {
  validateEmail,
  validateNik,
  validateConfirmPassword,
  validateNotEmpty,
  validateValue,
} from "@/helpers";

export function SignUp() {
  const [isNext, setNext] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nik: "",
    },
    validateOnBlur: true,
    validate: (values) => {
      let errors = {};
      if (validateValue(values.email, validateNotEmpty)) {
        errors.email = "Email is required";
      } else if (validateValue(values.email, validateEmail)) {
        errors.email = "Email is invalid";
      }
      if (validateValue(values.password, validateNotEmpty)) {
        errors.password = "Password is required";
      }
      if (validateValue(values.confirmPassword, validateNotEmpty)) {
        errors.confirmPassword = "Confirm password is required";
      } else if (
        validateConfirmPassword(values.password, values.confirmPassword)
      ) {
        errors.confirmPassword = "Password and confirm password is not match";
      }
      if (validateValue(values.name, validateNotEmpty)) {
        errors.name = "Name is required";
      }
      if (validateValue(values.nik, validateNotEmpty)) {
        errors.nik = "NIK is required";
      } else if (validateValue(values.nik, validateNik)) {
        errors.nik = "NIK is invalid";
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const handleNext = () => {
    setNext(!isNext);
  };
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 md:grid lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl">Daftar</h1>
          <h1 className="text-base text-center sm:text-xl">
            Sudah punya akun?{" "}
            <span className="italic font-bold">
              {" "}
              <Link to="/user/login">Masuk</Link>
            </span>
          </h1>
          {isNext ? (
            <div class="form-control space-y-1">
              <label class="label">
                <span class="label-text font-bold">Nama Lengkap</span>
              </label>
              <input
                type="text"
                placeholder="Nama lengkap sesuai KTP"
                class="input input-bordered"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div class="bg-red-600 text-white rounded-md text-sm font-medium px-2 py-1">
                  <div class="flex-1">
                    <label>{formik.errors.name}</label>
                  </div>
                </div>
              ) : null}
              <label class="label">
                <span class="label-text font-bold">NIK</span>
              </label>
              <input
                type="text"
                placeholder="NIK sesuai KTP"
                class="input input-bordered"
                name="nik"
                onChange={formik.handleChange}
                value={formik.values.nik}
              />
              {formik.errors.nik ? (
                <div class="bg-red-600 text-white rounded-md text-sm font-medium px-2 py-1">
                  <div class="flex-1">
                    <label>{formik.errors.nik}</label>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div class="form-control space-y-1">
              <label class="label">
                <span class="label-text font-bold">E-mail</span>
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
                <div class="bg-red-600 text-white rounded-md text-sm font-medium px-2 py-1">
                  <div class="flex-1">
                    <label>{formik.errors.email}</label>
                  </div>
                </div>
              ) : null}
              <label class="label">
                <span class="label-text font-bold">Kata Sandi</span>
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
                <div class="bg-red-600 text-white rounded-md text-sm font-medium px-2 py-1">
                  <div class="flex-1">
                    <label>{formik.errors.password}</label>
                  </div>
                </div>
              ) : null}
              <label class="label">
                <span class="label-text font-bold">Konfirmasi Kata Sandi</span>
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
                <div class="bg-red-600 text-white rounded-md text-sm font-medium px-2 py-1">
                  <div class="flex-1">
                    <label>Konfirmasi Kata sandi tidak cocok</label>
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
              <ConfirmDialog
                isOpen={isOpen}
                setOpen={setOpen}
                handleConfirm={formik.handleSubmit}
                title="Konfirmasi Data"
                message="Apakah anda benar-benar mengisi data sesuai dengan KTP yang anda miliki?"
                titleAction="Daftar"
                className="btn btn-block"
              />
            </>
          ) : (
            <button
              class="btn btn-block"
              onClick={handleNext}
              disabled={formik.errors.email || formik.errors.confirmPassword}
            >
              Daftar
            </button>
          )}
        </div>
      </PageContent>
    </Page>
  );
}
