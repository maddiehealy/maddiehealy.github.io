document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', loadXML);
  })
  
  var parentElement = document.getElementById('ochreTableBody');
  var url = "https://ochre.lib.uchicago.edu/ochre?uuid=6f18e3a7-a396-46d9-85cb-92674c24cfc0";
  
  function loadXML() {
    fetch(url)
    .then(response => response.text())
    .then(data =>
      parseData(data)
    )
    .catch(error => {
      console.error('Error loading XML file:', error);
    })
  };

  function parseData(xmlData){
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    createHeaders(xmlDoc),
    listProps(xmlDoc);
    updateImageContent(xmlDoc);
  };
  
  function createHeaders(sourceXML){
    document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML;
    document.getElementById('itemTitle').innerText = sourceXML.getElementsByTagName('spatialUnit')[0].children[3].children[0].children[0].children[0].innerHTML;
    document.getElementById('itemDescription').innerText = sourceXML.getElementsByTagName('spatialUnit')[0].children[4].children[0].children[0].innerHTML
    var licenseText = document.getElementById('license');
    licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML;
  }
  
  function listProps(sourceXML){
    var baseXPath = '/result/ochre/spatialUnit/observations/observation/properties/'
    console.log(sourceXML);
    var allProps = sourceXML.getElementsByTagName('properties');
    showProp()
    for (i=0; i < propList.length; i++) {
      let newUL = document.createElement("ul");
  
      document.getElementById('itemLists').appendChild(newUL);
    };
  }
  
  function showProp(){
  
    let newLI = document.createElement("li");
    newLI.innerHTML = propList[i].children[0].children[0].children[0].innerHTML + ": " + propList[i].children[1].innerHTML;
    //populate the cells in the row
    document.getElementById('itemDetails').appendChild(newLI);
  }

  function updateImageContent(xmlDoc) {
    const previewImage = xmlDoc.querySelector("previewImage");
    if (previewImage) {
        const imageSrc = previewImage.getAttribute("src");
        loadImage(imageSrc);  // Pass the source URL of the image to the loadImage function
    }
}

function loadImage(imageSrc) {
    const imageContainer = document.getElementById('imageOutput');
    if (imageContainer) {
        let newIMG = document.createElement("img");
        newIMG.src = imageSrc;  // Directly use the provided image source
        newIMG.className = "img-fluid";
        imageContainer.appendChild(newIMG);
    }
}