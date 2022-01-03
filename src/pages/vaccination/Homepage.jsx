import { useState } from "react";
import { Page, PageContent } from "components/layout/page";
import { Map } from "./Map";
import useGeolocation from "react-hook-geolocation";

export function VaccinationHomepage() {
  const geolocation = useGeolocation();

  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 md:grid lg:px-8">
          {geolocation.latitude && geolocation.longitude ? (
            <Map
              latitude={geolocation.latitude}
              longitude={geolocation.longitude}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </div>
      </PageContent>
    </Page>
  );
}
