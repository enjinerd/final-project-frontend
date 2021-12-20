import { useState } from "react";
import { Page, PageContent } from "@/components/layout/page";
import { Link } from "react-router-dom";
import { ConfirmDialog } from "@/components/ui";

export function SignUp() {
  const [isNext, setNext] = useState(false);
  const [isOpen, setOpen] = useState(false);
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
              />
              <label class="label">
                <span class="label-text font-bold">NIK</span>
              </label>
              <input
                type="text"
                placeholder="NIK sesuai KTP"
                class="input input-bordered"
              />
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
                handleConfirm={console.log("confirm")}
                title="Konfirmasi Data"
                message="Apakah anda benar-benar mengisi data sesuai dengan KTP yang anda miliki?"
                titleAction="Daftar"
                className="btn btn-block"
              />
            </>
          ) : (
            <button class="btn btn-block" onClick={handleNext}>
              Proses
            </button>
          )}
        </div>
      </PageContent>
    </Page>
  );
}
