import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Page, PageContent } from "components/layout/page";
import { Map } from "./Map";
export function VaccinationHomepage() {
  const position = [51.505, -0.09];

  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 md:grid lg:px-8">
          <Map />
        </div>
      </PageContent>
    </Page>
  );
}
