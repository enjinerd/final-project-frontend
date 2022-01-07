import { Page, PageContent } from "components/layout/page";
import { HomepageNews } from "components/user";
export function News() {
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center justify-center px-4 py-8 space-y-2 lg:px-8">
          <HomepageNews allNews={true} />
        </div>
      </PageContent>
    </Page>
  );
}
