import { Page, PageContent } from "components/layout/page";
import { useFormik } from "formik";
import { validateEmail, validateNotEmpty, validateValue } from "helpers";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";

export function Login() {
  const { login, error, isAuthenticated } = useAuthStore();
  const history = useHistory();
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
      await login(values);
      if (!error) {
        history.push("/user");
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  if (isAuthenticated) {
    return <Redirect to="/user" />;
  }
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="font-bold font-primary text-2xl text-center sm:text-xl">
            Masuk
          </h1>
          <div class="form-control space-y-1">
            <h1 className="text-base text-center sm:text-xl">
              Belum punya akun?{" "}
              <span className="font-bold italic">
                {" "}
                <Link to="/user/signup">Daftar</Link>
              </span>
            </h1>
            {error && (
              <div className="alert alert-error font-medium my-1">
                <div className="flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 mx-2 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <label>Email atau kata sandi salah</label>
                </div>
              </div>
            )}
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
              <a href="#" class="font-semibold label-text-alt text-gray-400">
                Lupa kata sandi?
              </a>
            </label>
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
            Masuk
          </button>
        </div>
      </PageContent>
    </Page>
  );
}
