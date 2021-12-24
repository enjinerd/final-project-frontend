import { Page, PageContent } from "components/layout/page";
import useAuthStore from "stores/useAuthStore";

export function UserDashboard() {
  const { logout } = useAuthStore();
  return (
    <Page>
      <PageContent>
        <div>
          <h1>User Dashboard</h1>
          <button className="btn btn-error btn-block" onClick={logout}>
            Logout
          </button>
        </div>
      </PageContent>
    </Page>
  );
}
