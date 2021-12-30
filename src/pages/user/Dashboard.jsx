import { Page, PageContent } from "components/layout/page";
import useAuthStore from "stores/useAuthStore";
import { UserMenus } from "components/user";

export function UserDashboard() {
  const { logout } = useAuthStore();
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-8 md:grid lg:px-8">
          <p className="text-2xl sm:text-xl font-primary">
            Halo, <strong>Pengguna</strong>
          </p>
          <div className="text-center alert-error py-1 font-semibold font-secondary">
            <p>Belum Vaksinasi</p>
          </div>
          <UserMenus />
          <button className="btn btn-error btn-block" onClick={logout}>
            Keluar Akun
          </button>
        </div>
      </PageContent>
    </Page>
  );
}
