document.addEventListener('DOMContentLoaded', () => {
    // Check if the element for item 1 exists
    if (document.getElementById('item1Page')) {
        loadXML('6f18e3a7-a396-46d9-85cb-92674c24cfc0');
    }

    // Check if the element for item 2 exists
    if (document.getElementById('item2Page')) {
        loadXML('50f7b9a5-329a-49ab-85e2-f8fb4ee6e867');
    }
});

function loadXML(uuid) {
    const url = `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            console.log('XML Data loaded:', data);  // Log the raw XML data
            parseData(data);
        })
        .catch(error => {
            console.error('Error loading XML file:', error);
        });
}

function parseData(xmlData) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    console.log('Parsed XML Document:', xmlDoc);  // Log the parsed XML document

    createHeaders(xmlDoc);
    listProps(xmlDoc);
    updateImageContent(xmlDoc);  // Ensure the image update logic is called
}

function createHeaders(sourceXML) {
    try {
        const title = sourceXML.querySelector('metadata description');
        const identification = sourceXML.querySelector('resource identification label');
        const description = sourceXML.querySelector('resource description');
        const license = sourceXML.querySelector('availability license');

        console.log('Title:', title ? title.textContent : 'Title not found');
        console.log('Identification:', identification ? identification.textContent : 'Identification not found');
        console.log('Description:', description ? description.textContent : 'Description not found');
        console.log('License:', license ? license.textContent : 'License not found');

        document.getElementById('projectTitle').innerText = title ? title.textContent : 'Title not found';

        if (identification && identification.textContent !== 'Identification not found') {
            document.getElementById('itemTitle').innerText = identification.textContent;
        } else {
            document.getElementById('itemTitle').style.display = 'none';
        }

        if (description && description.textContent !== 'Description not found') {
            document.getElementById('itemDescription').innerText = description.textContent;
        } else {
            document.getElementById('itemDescription').style.display = 'none';
        }

        if (license && license.textContent !== 'No license information provided') {
            document.getElementById('license').innerText = license.textContent;
        } else {
            document.getElementById('license').style.display = 'none';
        }
    } catch (error) {
        console.error('Error creating headers:', error);
    }
}

function listProps(sourceXML) {
    try {
        console.log('Listing properties from:', sourceXML);  // Log the source XML for properties
        const properties = sourceXML.querySelectorAll('resource properties property, spatialUnit properties property');
        console.log('Found Properties:', properties);
        properties.forEach(prop => {
            let newUL = document.createElement("ul");
            document.getElementById('itemLists').appendChild(newUL);
            showProp(prop, newUL);  // Corrected to pass the individual properties and the parent UL
        });
    } catch (error) {
        console.error('Error listing properties:', error);
    }
}

function showProp(prop, parentUL) {
    try {
        let newLI = document.createElement("li");
        const label = prop.querySelector('label');
        const value = prop.querySelector('value');
        console.log('Property Label:', label ? label.textContent : 'Label not found');
        console.log('Property Value:', value ? value.textContent : 'Value not found');
        newLI.innerHTML = (label ? label.textContent : 'Label not found') + ": " + (value ? value.textContent : 'Value not found');
        parentUL.appendChild(newLI);  // Append to the passed UL
    } catch (error) {
        console.error('Error showing property:', error);
    }
}

function updateImageContent(xmlDoc) {
    try {
        const resourceElement = xmlDoc.querySelector("resource[format='image/jpeg'], resource[type='image/jpeg']");
        if (resourceElement) {
            const imageUuid = resourceElement.getAttribute("uuid");
            const imageSrc = `https://ochre.lib.uchicago.edu/iiif/${imageUuid}/full/full/0/default.jpg`;
            console.log('Image UUID:', imageUuid);
            console.log('Image Source URL:', imageSrc);  // Log the image source URL
            loadImage(imageSrc);  // Pass the source URL of the image to the loadImage function
        } else {
            console.error('No image element found in the XML document.');
        }
    } catch (error) {
        console.error('Error updating image content:', error);
    }
}

function loadImage(imageSrc) {
    try {
        const imageContainer = document.getElementById('imageOutput');
        if (imageContainer) {
            imageContainer.innerHTML = '';  // Clear any existing content
            let newIMG = document.createElement("img");
            newIMG.src = imageSrc;
            newIMG.className = "img-fluid";
            newIMG.alt = "Resource Image";
            console.log('Image Element:', newIMG);  // Log the image element before appending
            imageContainer.appendChild(newIMG);
        }
    } catch (error) {
        console.error('Error loading image:', error);
    }
}

// Additional functionality as per the provided JS
$(document).ready(function() {
    $("#subHead").attr("class", "");
    var changeMargin = (($("#globalPLNCE").height()) + ($("#globalIdDescr").height())) * -.75;
    $("#iframeCol").attr("style", "margin-top:" + changeMargin + "px");
});

try {
    $("#imageGrid").ready(galleryCheck(1));
} catch (error) {}

// Hide an image if it cannot be loaded
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelectorAll('img').forEach(function(img) {
        img.onerror = function() {
            this.style.display = 'none';
        };
    });
});

// Display word-level properties from a discourse hierarchy
function dUnitPopUp(uuid) {
    var popup = document.getElementById("myPopup_" + uuid);
    console.log(uuid);
    uuid.length !== 0 ? popup.classList.toggle("show") : null;
}
