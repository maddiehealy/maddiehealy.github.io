document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', loadXML);
})

var parentElement = document.getElementById('ochreTableBody');
var url = "https://ochre.lib.uchicago.edu/ochre?uuid=6f18e3a7-a396-46d9-85cb-92674c24cfc0";

function loadXML() {
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

function parseData(xmlData){
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    console.log('Parsed XML Document:', xmlDoc);  // Log the parsed XML document
    createHeaders(xmlDoc);
    listProps(xmlDoc);
    updateImageContent(xmlDoc);  // Ensure the image update logic is called
}

function createHeaders(sourceXML){
    document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML;
    document.getElementById('itemTitle').innerText = sourceXML.getElementsByTagName('spatialUnit')[0].children[3].children[0].children[0].children[0].innerHTML;
    document.getElementById('itemDescription').innerText = sourceXML.getElementsByTagName('spatialUnit')[0].children[4].children[0].children[0].innerHTML;
    var licenseText = document.getElementById('license');
    licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML;
}

function listProps(sourceXML){
    var baseXPath = '/result/ochre/spatialUnit/observations/observation/properties/';
    console.log('Listing properties from:', sourceXML);  // Log the source XML for properties
    var allProps = sourceXML.getElementsByTagName('properties');
    for (let i = 0; i < allProps.length; i++) {
        let newUL = document.createElement("ul");
        document.getElementById('itemLists').appendChild(newUL);
        showProp(allProps[i]);  // Corrected to pass the individual properties
    }
}

function showProp(prop){
    let newLI = document.createElement("li");
    newLI.innerHTML = prop.children[0].children[0].children[0].innerHTML + ": " + prop.children[1].innerHTML;
    document.getElementById('itemLists').appendChild(newLI);  // Ensure the correct element is targeted
}

function updateImageContent(xmlDoc) {
    const previewImage = xmlDoc.querySelector("previewImage");
    console.log('Preview Image Element:', previewImage);  // Log the preview image element
    if (previewImage) {
        const imageSrc = previewImage.getAttribute("src");
        console.log('Preview Image Source:', imageSrc);  // Log the image source URL
        loadImage(imageSrc);  // Pass the source URL of the image to the loadImage function
    }
}

function loadImage(imageSrc) {
    const imageContainer = document.getElementById('imageOutput');
    if (imageContainer) {
        let newIMG = document.createElement("img");
        newIMG.src = imageSrc;
        newIMG.className = "img-fluid";
        console.log('Image Element:', newIMG);  // Log the image element before appending
        imageContainer.appendChild(newIMG);
    }
}
