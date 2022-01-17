import { Page, PageContent } from "components/layout/page";
import { HomepageNews } from "components/user";
import { useFetchNews } from "hooks/user";
import { useState, useEffect } from "react";

export function News() {
  const [news, setNews] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { data: newsFetchData, isLoading } = useFetchNews();

  useEffect(() => {
    if (newsFetchData) {
      setNews(newsFetchData);
    }
  }, [newsFetchData]);
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <HomepageNews allNews={true} data={news} />
        </div>
      </PageContent>
    </Page>
  );
}
