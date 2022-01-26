import { Page, PageContent } from "components/layout/page";
import { HomepageNews } from "components/user";
import { Link } from "react-router-dom";
import { useFetchNews } from "hooks/user";
import { useFetchVaccInfo } from "hooks/vaccination";
import { useEffect, useState } from "react";
import Typist from 'react-text-typist';

export function Home() {
  const [news, setNews] = useState([]);
  const { data: newsFetchData, isLoading } = useFetchNews();
  const { data: vaccInfoFetchData } = useFetchVaccInfo();

  useEffect(() => {
    if (newsFetchData) {
      setNews(newsFetchData);
    }
  }, [newsFetchData]);
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center px-3 py-8 space-y-2 lg:px-8">
          <Link
            to="/vaccination"
            className="text-xl font-bold text-gray-800 font-primary"
          >
            <img
              src="https://res.cloudinary.com/dvhdig9hg/image/upload/v1641538598/cta-daftar2_ltv1aa.png"
              className="w-auto h-auto"
            />
          </Link>
          <div className="w-full lg:px-8">
            <div className="w-full px-2 py-3 bg-gradient-to-r from-orange-400 to-rose-400">
              <p className="text-base font-semibold text-center text-transparent bg-clip-text bg-gradient-to-tr from-rose-100 to-teal-100 md:text-lg font-secondary">
              <Typist sentences={[vaccInfoFetchData?.vaksinasi1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")]} loop={true} cursorSmooth={true} typingSpeed={150} />
              Warga telah divaksinasi
              </p>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center">
              <div className="flex items-center justify-center p-12">
                <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin dark:border-white"></div>
              </div>
            </div>
          ) : (
            <HomepageNews allNews={false} data={news} />
          )}
        </div>
      </PageContent>
    </Page>
  );
}
