import { Page, PageContent } from "components/layout/page";
import { HomepageNews } from "components/user";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center px-4 py-8 space-y-2 lg:px-8">
          <Link
            to="/user/vaccine-session"
            className="text-xl font-bold text-gray-800 font-primary"
          >
            <img
              src="https://res.cloudinary.com/dvhdig9hg/image/upload/v1641538598/cta-daftar2_ltv1aa.png"
              className="w-auto h-auto"
            />
          </Link>
          <HomepageNews allNews={false} />
        </div>
      </PageContent>
    </Page>
  );
}
