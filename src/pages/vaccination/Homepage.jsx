import { Map } from "./Map";
import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { distancePlace } from "helpers";

const faskes = [
  {
    name: "RSUP Dr. Kariadi",
    longitude: 106.827,
    latitude: -6.2,
  },
  {
    name: "RS Satya Husada",
    longitude: 106.727,
    latitude: -8.1,
  },
  {
    name: "RS Crimson",
    longitude: 116.827,
    latitude: -9.2,
  },
];

export function VaccinationHomepage() {
  const [nearby, setNearby] = useState();

  const [status, setStatus] = useState(null);
  const [userPos, setUserPos] = useState({
    latitude: -6.2,
    longitude: 106.816666,
  });
  const mockUser = { latitude: -6.2, longitude: 106.816666 };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setUserPos({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  const getNearbyFaskes = () => {
    const faksesLatitude = faskes.map((f) => f.latitude);
    const faksesLongitude = faskes.map((f) => f.longitude);
    const distanceFaskes = faksesLatitude.map((lat, idx) => {
      const log = faksesLongitude[idx];
      return distancePlace(mockUser.latitude, mockUser.longitude, lat, log);
    });
    const closestFaskes = Math.min(...distanceFaskes);
    console.log(closestFaskes);
    const closestFaskesIndex = distanceFaskes.indexOf(closestFaskes);
    console.log("closestFaskesIndex : ", faskes[closestFaskesIndex]);
    setNearby(faskes[closestFaskesIndex]);
    return faskes[closestFaskesIndex];
  };
  useEffect(() => {
    getNearbyFaskes();
  }, []);

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
          <Map latitude={userPos.latitude} longitude={userPos.longitude} />
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg font-semibold text-center font-primary sm:text-xl">
              Lokasi Vaksinasi Terdekat
            </h1>
            {nearby && (
              <Link to="/vaccination/session">
                <div className="flex flex-row justify-between px-6 py-4 transition-colors duration-200 bg-white rounded-lg shadow-lg text-dark hover:bg-gray-200">
                  <p className="font-bold">{nearby?.name} </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
