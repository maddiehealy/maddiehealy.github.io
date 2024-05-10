const OCHRE_BASE_URL = "https://ochre.lib.uchicago.edu/ochre?uuid=";

function loadOchreData(uuid, containerSelector) {
    const url = OCHRE_BASE_URL + uuid;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(xmlString => {
            // Handle the initial XML parsing and display
            return handleXmlResponse(xmlString, containerSelector);
        })
        .then(additionalUuid => {
            // Conditionally fetch additional data if there's another UUID to process
            if (additionalUuid) {
                return fetchAdditionalData(additionalUuid, containerSelector);
            }
        })
        .catch(error => {
            console.error("Error fetching OCHRE data:", error);
            document.querySelector(containerSelector).innerHTML = `<p>Error loading data. ${error.message}</p>`;
        });
}

function handleXmlResponse(xmlString, containerSelector) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "application/xml");
    if (xml.documentElement.nodeName === "parsererror") {
        throw new Error("Error parsing XML data.");
    }

    const title = xml.querySelector("title")?.textContent || "No Title Available";
    const previewImage = xml.querySelector("previewImage")?.getAttribute("src");
    let html = `<h2>${title}</h2>`;
    if (previewImage) {
        html += `<img src="${previewImage}" alt="${title}" class="img-fluid mb-4">`;
    }

    const properties = xml.querySelectorAll("property");
    if (properties.length > 0) {
        html += "<h3>Properties:</h3><ul>";
        properties.forEach(prop => {
            const fullText = prop.textContent.trim();
            const splitIndex = fullText.indexOf(':');
            if (splitIndex !== -1) {
                const name = fullText.substring(0, splitIndex).trim();
                const value = fullText.substring(splitIndex + 1).trim();
                html += `<li><strong>${name}:</strong> ${value}</li>`;
            } else {
                html += `<li>${fullText}</li>`;
            }
        });
        html += "</ul>";
    } else {
        html += "<p>No properties available.</p>";
    }

    document.querySelector(containerSelector).innerHTML = html;

    // Optionally return an additional UUID to fetch more data if needed
    // return "another_uuid";
}

function fetchAdditionalData(uuid, containerSelector) {
    const url = OCHRE_BASE_URL + uuid;
    return fetch(url)
        .then(response => response.text())
        .then(xmlString => {
            // Process additional XML data
            console.log("Additional data loaded");
        });
}
