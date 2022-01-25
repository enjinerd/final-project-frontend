import { Marker } from "react-map-gl";

function validateMapData(val) {
  const isLatitude = num => isFinite(num) && Math.abs(num) <= 90;
  const isLongitude = num => isFinite(num) && Math.abs(num) <= 180;
  if(!val) return false;
  if(!isLatitude(val.latitude)) return false;
  if(!isLongitude(val.longitude)) return false;
  return true;
}

export function HealthPin({ data, onClick }) {
  return (
    <div>
      {data?.filter(val => validateMapData(val)).map((loc, index) => (
        <Marker
          latitude={parseFloat(loc?.latitude)}
          longitude={parseFloat(loc?.longitude)}
          key={index}
        >
          <svg
            className="w-8 h-8 text-red-500 cursor-pointer"
            viewBox="0 0 12 11"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() =>
              onClick({
                latitude: parseFloat(loc?.latitude),
                longitude: parseFloat(loc?.longitude),
                name: loc?.name,
                id: loc.vaccine[0]?.health_facilitator_id,
              })
            }
          >
            <path
              d="M11.004 0H0.996032C0.729661 0.00237698 0.47513 0.110409 0.28837 0.300356C0.10161 0.490304 -0.00209885 0.746627 3.22044e-05 1.013V6.593C-0.000848416 6.7802 0.0500584 6.96399 0.147124 7.12406C0.244189 7.28413 0.383631 7.41424 0.550032 7.5L5.33003 10.34C5.53737 10.4457 5.7668 10.5008 5.99953 10.5008C6.23227 10.5008 6.46169 10.4457 6.66903 10.34L11.449 7.5C11.6155 7.41445 11.755 7.28456 11.8523 7.12467C11.9495 6.96479 12.0006 6.78113 12 6.594V1.014C12.0012 0.88202 11.9764 0.751099 11.927 0.628712C11.8776 0.506325 11.8045 0.39487 11.7121 0.30071C11.6196 0.20655 11.5094 0.131531 11.388 0.0799346C11.2665 0.0283385 11.136 0.00117662 11.004 0V0ZM9.00003 5.5H7.00003V7.5H5.00003V5.5H3.00003V3.5H5.00003V1.5H7.00003V3.5H9.00003V5.5Z"
              fill="#DC2626"
            />
          </svg>
        </Marker>
      ))}
    </div>
  );
}
