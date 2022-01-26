export function toGmapURL(lat, long) {
  const nLat = parseFloat(lat) - 0.00155;
  const nLong = parseFloat(long) + 0.00430;
  return `http://maps.google.com/maps?q=${lat},${long}&ll=${lat},${long}&z=17`
}