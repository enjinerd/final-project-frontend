import { Page, PageContent } from "@/components/layout/page";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 md:grid lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl">Masuk</h1>
          <div class="form-control space-y-1">
            <h1 className="text-base text-center sm:text-xl">
              Belum punya akun?{" "}
              <span className="italic font-bold">
                {" "}
                <Link to="/user/signup">Daftar</Link>
              </span>
            </h1>

            <label class="label">
              <span class="label-text font-bold">E-mail</span>
            </label>
            <input
              type="text"
              placeholder="contoh@email.com"
              class="input input-bordered"
            />
            <label class="label">
              <span class="label-text font-bold">Kata Sandi</span>
            </label>
            <input
              type="password"
              placeholder="*******"
              class="input input-bordered"
            />
            <label class="label">
              <a href="#" class="label-text-alt font-semibold text-gray-400">
                Lupa kata sandi?
              </a>
            </label>
          </div>
          <button class="btn btn-block">Masuk</button>
        </div>
      </PageContent>
    </Page>
  );
}
