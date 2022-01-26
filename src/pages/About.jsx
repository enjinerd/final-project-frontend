import { Page, PageContent } from "components/layout/page";
import { NotFoundSvg } from "components/ui/svg";
import { Link } from "react-router-dom";
import { useFetchVaccInfo } from "hooks/vaccination";
import { useEffect } from "react";

export function About() {
  const { data, isLoading, error } = useFetchVaccInfo();
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col justify-center px-3 py-8 space-y-4 lg:px-8">
          <p className="px-3 py-2 text-base font-medium bg-red-200 font-primary">
            #VaksinasiUntukRakyat
          </p>
          <p className="mt-4 text-lg font-bold font-primary">
            Data Vaksinasi COVID-19 Indonesia
          </p>
          <div className="flex flex-col p-3 border rounded-md bg-emerald-100 border-1 border-emerald-300">
            <p className="text-base font-medium font-primary">
              Jumlah Sasaran Vaksinasi
            </p>
            <p className="text-2xl font-bold font-secondary text-emerald-600">
              {data?.total_sasaran_vaksinasi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="flex flex-col p-3 border bg-emerald-100 border-1 border-emerald-300 rounded-mdm">
              <p className="text-base font-medium font-primary">
                Vaksinasi Dosis 1
              </p>
              <p className="text-2xl font-bold font-secondary text-emerald-600">
                {data?.vaksinasi1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
            <div className="flex flex-col p-3 border bg-emerald-100 border-1 border-emerald-300 rounded-mdm">
              <p className="text-base font-medium font-primary">
                Vaksinasi Dosis 2
              </p>
              <p className="text-2xl font-bold font-secondary text-emerald-600">
                {data?.vaksinasi2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="mt-8 text-lg font-bold text-center font-primary">
              Aplikasi ini dibuat oleh
            </p>
            <div className="flex flex-col space-y-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/agusjanardana"
                className="flex flex-col items-center justify-center w-full p-3 text-center border border-gray-300 rounded-md shadow-lg cursor-pointer border-1 hover:bg-gray-200"
              >
                <img
                  src="https://github.com/agusjanardana.png"
                  className="w-16 h-16 rounded-full"
                />
                <p className="font-medium text-center font-secondary">
                  I Gde Bagus Janardana Abasan
                </p>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/enjinerd"
                className="flex flex-col items-center justify-center w-full p-3 text-center border border-gray-300 rounded-md shadow-lg cursor-pointer border-1 hover:bg-gray-200"
              >
                <img
                  src="https://github.com/enjinerd.png"
                  className="w-16 h-16 rounded-full"
                />
                <p className="font-medium text-center font-secondary">
                  Roni Ardiyanto
                </p>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/yustinayasin"
                className="flex flex-col items-center justify-center w-full p-3 text-center border border-gray-300 rounded-md shadow-lg cursor-pointer border-1 hover:bg-gray-200"
              >
                <img
                  src="https://github.com/yustinayasin.png"
                  className="w-16 h-16 rounded-full"
                />
                <p className="font-medium text-center font-secondary">
                  Yustina Yasin
                </p>
              </a>
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
