import { Page, PageContent } from "@/components/layout/page";
import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 md:grid lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl">Daftar</h1>
          <div class="form-control space-y-1">
            <h1 className="text-base text-center sm:text-xl">
              Sudah punya akun?{" "}
              <span className="italic font-bold">
                {" "}
                <Link to="/user/login">Masuk</Link>
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
              type="text"
              placeholder="********"
              class="input input-bordered"
            />
            <label class="label">
              <span class="label-text font-bold">Konfirmasi Kata Sandi</span>
            </label>
            <input
              type="text"
              placeholder="********"
              class="input input-bordered"
            />
            <label class="label">
              <span class="label-text font-bold">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="Nama Lengkap Sesuai KTP"
              class="input input-bordered"
            />
            <label class="label">
              <span class="label-text font-bold">NIK</span>
            </label>
            <input
              type="number"
              placeholder="Nomor KTP"
              class="input input-bordered"
            />
          </div>
          <button class="btn btn-block">Daftar</button>
        </div>
      </PageContent>
    </Page>
  );
}
