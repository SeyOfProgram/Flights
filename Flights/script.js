async function haalVluchtenOp() {
    const apiKey = "d53e70b1d4f27ba35180db7d1e8798ce";
    const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}`;

    // Luchthavens per land (IATA-codes)
    const luchthavens = {
        NL: ["AMS", "RTM", "EIN"],
        BE: ["BRU", "CRL"],
        DE: ["FRA", "MUC", "BER", "DUS"],
        FR: ["CDG", "ORY", "NCE"],
        UK: ["LHR", "LGW", "MAN"],
        US: ["JFK", "LAX", "MIA", "ORD", "ATL"],
        CA: ["YVR", "YYZ", "YUL"],
        TR: ["IST", "SAW", "ESB", "ADB", "AYT"],
        AE: ["DXB", "AUH"],
        SA: ["JED", "RUH"],
        EG: ["CAI", "HRG"],
        ZA: ["CPT", "JNB"],
        CN: ["PEK", "PVG", "CAN", "HKG"] // China toegevoegd
    };

    // Geselecteerd land ophalen
    const geselecteerdLand = document.getElementById("landSelect").value;
    const geselecteerdeLuchthavens = luchthavens[geselecteerdLand];

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Filter alleen vluchten voor het geselecteerde land
        const gefilterdeVluchten = data.data.filter(vlucht =>
            geselecteerdeLuchthavens.includes(vlucht.departure.iata) ||
            geselecteerdeLuchthavens.includes(vlucht.arrival.iata)
        ).slice(0, 10); // Maximaal 10 tonen

        let html = `<h2>Vluchten in ${document.getElementById("landSelect").options[document.getElementById("landSelect").selectedIndex].text}</h2>`;
        if (gefilterdeVluchten.length === 0) {
            html += "<p>Geen vluchten gevonden voor dit land.</p>";
        } else {
            gefilterdeVluchten.forEach(vlucht => {
                html += `
                    <div class="vlucht">
                        <p><strong>Vlucht:</strong> ${vlucht.flight.iata || "Onbekend"}</p>
                        <p><strong>Maatschappij:</strong> ${vlucht.airline.name || "Onbekend"}</p>
                        <p><strong>Vertrek:</strong> ${vlucht.departure.airport || "Onbekend"} - ${vlucht.departure.scheduled || "Geen info"}</p>
                        <p><strong>Aankomst:</strong> ${vlucht.arrival.airport || "Onbekend"} - ${vlucht.arrival.scheduled || "Geen info"}</p>
                        <p><strong>Status:</strong> ${vlucht.flight_status || "Onbekend"}</p>
                    </div>
                `;
            });
        }

        document.getElementById("resultaten").innerHTML = html;
    } catch (error) {
        document.getElementById("resultaten").innerHTML = "<p>Er is een fout opgetreden bij het ophalen van vluchtgegevens.</p>";
        console.error("Fout bij ophalen gegevens:", error);
    }
}

// Laad standaard de vluchten voor Nederland bij het openen van de pagina
window.onload = function() {
    haalVluchtenOp();
};
