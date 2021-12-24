import { Page, PageContent } from "components/layout/page";
import useAuth from "hooks/useAuth";
export function UserDashboard() {
  const { logoutUser } = useAuth();
  return (
    <Page>
      <PageContent>
        <div>
          <h1>User Dashboard</h1>
          <button className="btn btn-error btn-block" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </PageContent>
    </Page>
  );
}
