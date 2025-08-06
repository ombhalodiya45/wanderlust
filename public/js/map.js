// public/js/map.js

document.addEventListener("DOMContentLoaded", function () {
    const mapDiv = document.getElementById("map");

    if (!mapDiv) return; //If map element doesn't exist, stop

    //Read lat/lng, title, location from data-* attributes
    const lat = parseFloat(mapDiv.dataset.lat);
    const lng = parseFloat(mapDiv.dataset.lng);
    const title = mapDiv.dataset.title;
    const location = mapDiv.dataset.location;

    //Initialize Map (Center on listing location)
    const map = L.map("map").setView([lat || 22.5645, lng || 72.9289], 13);

    //Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    }).addTo(map);

    //Show listing location marker
    if (!isNaN(lat) && !isNaN(lng)) {
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${title}</b><br>${location}`).openPopup();
    } else {
        alert("No coordinates available for this listing.");
    }
});
