//voeg leaflet kaart
let map = L.map('map').setView([51.05, 3.73], 13);

//voeg de basemap toe
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const apiURL = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
//functie om parkeerdata op te halen en te tonen

 async function fetchAndDisplayParkings(){
    const parkingContainer = document.getElementById("parking-data");
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("status:", response.status);
        }
        console.log("mijn response", response);

        const data = await response.json();
        console.log("mijn data", data);
        const parkings = data.results;

        // destructuring nieuwe javascricpt
        parkings.forEach(parking => {
            const {occupation, name, totalcapacity, availablecapacity, isopennow, location} = parking;
            // const occupied = totalcapacity - availablecapacity;
            const status = isopennow ? "Open" : "Gesloten";

            const parkingDiv = document.createElement("div");
            parkingDiv.className = "parking";
            parkingDiv.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Capaciteit:</strong> Max: ${totalcapacity}</p>
            <p><strong>Bezet:</strong> ${occupation}</p>
            <p class="${isopennow ? "open" : "closed"}"><strong>Status:</strong> ${status}</p>
            <p>Beschikbaar: ${availablecapacity}</p>
            `;

            parkingContainer.appendChild(parkingDiv);

            displayParkingsOnMap(location);

        });
      
      

    } catch (error) {
        console.error("fout bij data fetch", error);
        
    } finally {
        console.log("fetching done");
    };

};

function displayParkingsOnMap(location) {
    const {lat, lon} = location;
    console.log(lat, lon);

    L.marker([lat, lon]).addTo(map);
    

};

fetchAndDisplayParkings();
