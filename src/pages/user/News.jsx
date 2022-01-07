import { Page, PageContent } from "components/layout/page";
import { HomepageNews } from "components/user";
export function News() {
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <HomepageNews allNews={true} />
        </div>
      </PageContent>
    </Page>
  );
}