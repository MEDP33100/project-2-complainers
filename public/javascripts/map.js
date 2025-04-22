document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([40.7128, -74.006], 12); // nyc coordinates - centers map on nyc

  // base tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // marker cluster group - groups markers that separate when user zooms on map
  const markers = L.markerClusterGroup();

  complaints.forEach((complaint) => {
    const { latitude, longitude } = complaint;

    if (latitude && longitude) {
      const marker = L.marker([latitude, longitude]).bindPopup(`
        <strong>Date:</strong> ${complaint.created_date}<br>
        <strong>Type:</strong> ${complaint.complaint_type}<br>
        <strong>ZIP:</strong> ${complaint.incident_zip}<br>
        <strong>Borough:</strong> ${complaint.borough}
      `);
      markers.addLayer(marker);
    }
  });

  map.addLayer(markers);
});
