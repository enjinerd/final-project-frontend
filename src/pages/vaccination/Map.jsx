import "mapbox-gl/dist/mapbox-gl.css";
import React, { useCallback, useRef, useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibmlyb2luIiwiYSI6ImNreTduZGxvMzE3ZjEyb280c3RpMGprMG8ifQ.E6efKzClsQa0Fq_sqz1UBA";

export const Map = ({ latitude, longitude }) => {
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
