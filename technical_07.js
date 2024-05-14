document.addEventListener('DOMContentLoaded', function() {
    const items = [
        { uuid: '6f18e3a7-a396-46d9-85cb-92674c24cfc0', containerSelector: '#item-details' },
        { uuid: '50f7b9a5-329a-49ab-85e2-f8fb4ee6e867', containerSelector: '#item-details' }
    ];

    items.forEach(({ uuid, containerSelector }) => {
        const url = `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`;
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.text();
            })
            .then(xmlData => {
                const xmlDoc = parseData(xmlData);
                updateDocumentContent(xmlDoc, containerSelector);
                updateImageContent(xmlDoc);  // Handles displaying of images if found in the XML
                loadImage(url);  // Function call to load image added
            })
            .catch(error => {
                console.error('Error loading XML data:', error);
                document.querySelector(containerSelector).innerHTML = `<p>Error loading item details: ${error.message}</p>`;
            });
    });
});

function parseData(xmlData) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    if (xmlDoc.documentElement.nodeName === "parsererror") {
        throw new Error("Error parsing XML data.");
    }
    return xmlDoc;
}

function updateDocumentContent(xmlDoc, containerSelector) {
    var itemTitle = xmlDoc.querySelector("title") ? xmlDoc.querySelector("title").textContent : "Title Not Found";
    var itemDescription = xmlDoc.querySelector("description") ? xmlDoc.querySelector("description").textContent : "Description Not Available";
    var license = xmlDoc.querySelector("license") ? xmlDoc.querySelector("license").textContent : "License Info Not  Not Available";
    
    let html = `<h2>${itemTitle}</h2>
        <p>Description: ${itemDescription}</p>
        <p>License: ${license}</p>`;

    var container = document.querySelector(containerSelector);
    if (container) {
        container.innerHTML = html;
    } else {
        console.error("Container not found for selector: " + containerSelector);
    }
}

function updateImageContent(xmlDoc) {
    const previewImage = xmlDoc.querySelector("previewImage") ? xmlDoc.querySelector("previewImage").getAttribute("src") : null;
    if (previewImage) {
        const imageContainer = document.getElementById('imageOutput');
        imageContainer.innerHTML = `<img src="${previewImage}" alt="Preview Image" class="img-fluid">`;
    }
}

function loadImage(url){
    let newIMG = document.createElement("img");
    newIMG.src = url + "&preview";
    newIMG.className = "img-fluid";
    document.getElementById('imageOutput').appendChild(newIMG);
}
