import { Map } from "./Map";
import { Page, PageContent } from "components/layout/page";
import { useState } from "react";
import { useFetchHF } from "hooks/vaccination";

export function VaccinationHomepage() {
  const { data, isLoading } = useFetchHF();
  const [status, setStatus] = useState(null);

  const [latitude, setLatitude] = useState(-6.2);
  const [longitude, setLongitude] = useState(106.816666);

  /**
   * If the browser doesn't support geolocation, set the status to "Geolocation is not supported by your
   * browser". Otherwise, set the status to "Locating..." and get the user's position. If the position
   * can't be retrieved, set the status to "Unable to retrieve your location".
   * @returns None
   */
  const handleLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setStatus("Unable to retrieve your location");
          console.log(err);
        }
      );
    }
  };

  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <button
            className="capitalize btn btn-block btn-primary"
            onClick={handleLocation}
          >
            Klik untuk otomatis mendeteksi lokasi anda Sekarang
          </button>
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
            <Map latitude={latitude} longitude={longitude} data={data} />
          )}
        </div>
      </PageContent>
    </Page>
  );
}
