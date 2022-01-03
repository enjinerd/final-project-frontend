import { useState } from "react";
import { Page, PageContent } from "components/layout/page";
import useAuthStore from "stores/useAuthStore";
import { UserMenus } from "components/user";
import { ConfirmDialog } from "components/ui";

export function UserDashboard() {
  const [isOpen, setOpen] = useState(false);
  const { logout } = useAuthStore();
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-8 lg:px-8">
          <p className="text-2xl sm:text-xl font-primary">
            Halo, <strong>Pengguna</strong>
          </p>
          <div className="text-center alert-error py-1 font-semibold font-secondary">
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
            className="btn btn-warning btn-block"
          />
        </div>
      </PageContent>
    </Page>
  );
}
