import { Page, PageContent } from "components/layout/page";
import { ConfirmDialog } from "components/ui";
import { UserMenus } from "components/user";
import { useState } from "react";
import useAuthStore from "stores/useAuthStore";

export function UserDashboard() {
  const [isOpen, setOpen] = useState(false);
  const { logout } = useAuthStore();
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-8 lg:px-8">
          <p className="font-primary text-2xl sm:text-xl">
            Halo, <strong>Pengguna</strong>
          </p>
          <div className="alert-error font-secondary py-1 font-semibold text-center">
            <p>Belum Vaksinasi</p>
          </div>
          <UserMenus />
          <ConfirmDialog
            isOpen={isOpen}
            setOpen={setOpen}
            handleConfirm={logout}
            title="Konfirmasi"
            message="Apakah anda benar-benar ingin keluar?"
            titleAction="Keluar"
            className="btn btn-block btn-warning"
          />
        </div>
      </PageContent>
    </Page>
  );
}
