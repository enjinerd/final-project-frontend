import "mapbox-gl/dist/mapbox-gl.css";
import React, { useCallback, useRef, useState, useEffect } from "react";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "turf";
import { distancePlace } from "helpers";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibmlyb2luIiwiYSI6ImNreTduZGxvMzE3ZjEyb280c3RpMGprMG8ifQ.E6efKzClsQa0Fq_sqz1UBA";

const faskes = [
  {
    longitude: 106.827,
    latitude: -6.2,
  },
  {
    longitude: 106.727,
    latitude: -8.1,
  },
  {
    longitude: 116.827,
    latitude: -9.2,
  },
];

export const Map = ({ latitude, longitude }) => {
  const mockUser = { latitude: -6.2, longitude: 106.816666 };
  const [nearby, setNearby] = useState();
  const [userPos, setUserPos] = useState({
    latitude,
    longitude,
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
    <div className="h-72">
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          latitude={userPos.latitude}
          longitude={userPos.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 text-emerald-500 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
        </Marker>
        {nearby && (
          <Marker
            latitude={nearby?.latitude}
            longitude={nearby?.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <svg
              class="h-8 text-red-500 w-8"
              viewBox="0 0 12 11"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.004 0H0.996032C0.729661 0.00237698 0.47513 0.110409 0.28837 0.300356C0.10161 0.490304 -0.00209885 0.746627 3.22044e-05 1.013V6.593C-0.000848416 6.7802 0.0500584 6.96399 0.147124 7.12406C0.244189 7.28413 0.383631 7.41424 0.550032 7.5L5.33003 10.34C5.53737 10.4457 5.7668 10.5008 5.99953 10.5008C6.23227 10.5008 6.46169 10.4457 6.66903 10.34L11.449 7.5C11.6155 7.41445 11.755 7.28456 11.8523 7.12467C11.9495 6.96479 12.0006 6.78113 12 6.594V1.014C12.0012 0.88202 11.9764 0.751099 11.927 0.628712C11.8776 0.506325 11.8045 0.39487 11.7121 0.30071C11.6196 0.20655 11.5094 0.131531 11.388 0.0799346C11.2665 0.0283385 11.136 0.00117662 11.004 0V0ZM9.00003 5.5H7.00003V7.5H5.00003V5.5H3.00003V3.5H5.00003V1.5H7.00003V3.5H9.00003V5.5Z"
                fill="#DC2626"
              />
            </svg>
          </Marker>
        )}
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
  );
};
