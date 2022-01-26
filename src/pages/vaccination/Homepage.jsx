import { Map } from "./Map";
import { Page, PageContent } from "components/layout/page";
import { useState } from "react";
import { useFetchHF } from "hooks/vaccination";

export function VaccinationHomepage() {
  const { data, isLoading } = useFetchHF();
  const [status, setStatus] = useState(null);

  // const [latitude, setLatitude] = useState(-6.2);
  // const [longitude, setLongitude] = useState(106.816666);

  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          {status && (
            <p className="alert alert-error alert-sm">
              Lokasi tidak valid, Pastikan anda memberi izin browser untuk
              mengakses lokasi.
            </p>
          )}
          {isLoading ? (
            <div className="text-center">
              <div className="flex items-center justify-center p-12">
                <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin dark:border-white"></div>
              </div>
            </div>
          ) : (
            <Map data={data} />
          )}
        </div>
      </PageContent>
    </Page>
  );
}
