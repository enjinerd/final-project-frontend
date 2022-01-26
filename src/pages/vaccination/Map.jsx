import "mapbox-gl/dist/mapbox-gl.css";
import React, { useCallback, useRef, useState, useEffect } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { distancePlace } from "helpers";
import { HealthPin, CityInfo } from "components/vaccination";
import { Link } from "react-router-dom";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibmlyb2luIiwiYSI6ImNreTduZGxvMzE3ZjEyb280c3RpMGprMG8ifQ.E6efKzClsQa0Fq_sqz1UBA";

export const Map = ({ latitude, longitude, data }) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [status, setStatus] = useState(null);

  const [nearby, setNearby] = useState();
  const [userPos, setUserPos] = useState({
    latitude: -6.2,
    longitude: 106.816666,
  });
  const [viewport, setViewport] = useState({
    latitude: -6.2,
    longitude: 106.816666,
    zoom: 14,
  });


  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  /**
   * It takes in a list of faskes and returns the 3 closest faskes.
   * @returns The function getNearbyFaskes is returning the 3 closest faskes.
   */
  const getNearbyFaskes = (data, userLatitude, userLongitude) => {
    let threeClosest = [];
    const faksesLatitude = data?.map((f) => parseFloat(f.latitude));
    const faksesLongitude = data?.map((f) => parseFloat(f.longitude));
    const distanceFaskes = faksesLatitude.map((lat, idx) => {
      const log = faksesLongitude[idx];
      return distancePlace(userLatitude, userLongitude, lat, log);
    });

    // find 3 closest faskes using Math.min
    for (let i = 0; i < 3; i++) {
      const min = Math.min(...distanceFaskes);
      const index = distanceFaskes.indexOf(min);
      threeClosest.push(data[index]);
      distanceFaskes[index] = Infinity;
    }
    setNearby(threeClosest);
    return threeClosest;
  };
  /**
   * If the browser doesn't support geolocation, set the status to "Geolocation is not supported by your
   * browser". Otherwise, set the status to "Locating..." and get the user's position. If the position
   * can't be retrieved, set the status to "Unable to retrieve your location".
   * @returns None
   */
  const handleLocation =  () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus(null);
        setUserPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setViewport({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 14,
        });
        await getNearbyFaskes(data, position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setStatus("Lokasi tidak bisa dideteksi, pastikan anda mengijinkan akses lokasi, atau cari lokasi anda secara manual");
        console.log(err);
      }
    );
  };

  useEffect(async () => {
    if (data || userPos) {
      await getNearbyFaskes(data, userPos.latitude, userPos.longitude);
    }
  }, [data, userPos]);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <button
          className="capitalize btn btn-block btn-primary"
          onClick={handleLocation}
        >
          Klik untuk otomatis mendeteksi lokasi anda Sekarang
        </button>
        {status && <div className="text-lg alert alert-error">{status}</div>}
        <div className="h-72">
          <MapGL
            ref={mapRef}
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            <HealthPin onClick={setPopupInfo} data={data} />
            {popupInfo && (
              <Popup
                tipSize={7}
                anchor="top"
                longitude={popupInfo?.longitude}
                latitude={popupInfo?.latitude}
                closeOnClick={false}
                onClose={setPopupInfo}
              >
                <CityInfo info={popupInfo} />
              </Popup>
            )}
            <Marker
              latitude={userPos?.latitude}
              longitude={userPos?.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-emerald-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </Marker>
            <Geocoder
              language="id"
              placeholder="Cari lokasi anda"
              mapRef={mapRef}
              marker={false}
              onViewportChange={handleGeocoderViewportChange}
              onResult={(data) =>
                setUserPos({
                  latitude: data.result.center[1],
                  longitude: data.result.center[0],
                })
              }
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-left"
            />
          </MapGL>
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-semibold text-center font-primary sm:text-xl">
            Lokasi Vaksinasi Terdekat
          </h1>
          {nearby?.map((f) => (
            <Link to={`/vaccination/${f.id}`}>
              <div className="flex flex-col px-6 py-4 transition-colors duration-200 bg-white rounded-lg shadow-lg text-dark hover:bg-gray-200">
                <p className="font-bold">{f?.name} </p>
                <p className="text-sm font-medium text-gray-700">
                  {f?.address}{" "}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
