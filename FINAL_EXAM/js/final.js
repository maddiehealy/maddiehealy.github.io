// Function to load XML document
function loadXMLDoc() {
    // Define the URL of the XML data
    const url = "https://ochre.lib.uchicago.edu/ochre?uuid=a6e6049c-66dc-43ee-968d-e74c4909f496";
    // const url = 'sample-1.xml'; // Use this line for local testing during final if needed

    // Fetch the XML data from the specified URL
    fetch(url)
        // Convert the response to text format
        .then(response => response.text())
        // Parse the XML data and pass it to the processXMLData function
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
            console.log("XML Document:", xmlDoc); // Debugging log
            processXMLData(xmlDoc);
        })
        // Catch and log any errors during fetch process
        .catch(error => {
            console.error('Error loading XML file:', error);
        });
}

// Function to process XML data
function processXMLData(xmlDoc) {
    // Collect all spatial units from the XML document
    const objectData = xmlDoc.getElementsByTagName("spatialUnit");
    console.log("Object Data:", objectData); // Debugging log

    // Call functions to display data
    displayUnorderedList(objectData);
    displayTable(objectData);
}

// Function to display unordered list
function displayUnorderedList(objectData) {
    // Get the output element where the list will be displayed
    const outputList = document.getElementById("output");
    // Clear any previous data in the list
    outputList.innerHTML = '';

    // Iterate through each spatial unit and create list items
    for (let i = 0; i < objectData.length; i++) {
        let listItem = document.createElement("li");
        listItem.textContent = objectData[i].getElementsByTagName("label")[0].textContent; // Gets the item label
        outputList.appendChild(listItem);
    }
}

// Function to display table
function displayTable(objectData) {
    // Get the table body element where the data will be displayed
    const tableBody = document.getElementById("myTableBody");
    // Clear any previous data in the table body
    tableBody.innerHTML = '';

    // Iterate through each spatial unit and create table rows
    for (let i = 0; i < objectData.length; i++) {
        // Create a new table row for each spatial unit
        let newRow = document.createElement("tr");
        newRow.id = "row" + i; // Adds unique id to each row

        // Create and append the first column (item label)
        let newCol01 = document.createElement("td");
        newCol01.innerHTML = objectData[i].getElementsByTagName("label")[0].innerHTML; // Gets the item label
        newRow.appendChild(newCol01);

        // Create and append the second column (property type)
        let newCol02 = document.createElement("td");
        newCol02.innerHTML = objectData[i].getElementsByTagName("value")[0].innerHTML; // Gets the first property value
        newRow.appendChild(newCol02);

        // Create and append the third column (additional property)
        let newCol03 = document.createElement("td");
        newCol03.innerHTML = objectData[i].getElementsByTagName("value")[1].innerHTML; // Gets the second property value
        newRow.appendChild(newCol03);

        // Create and append the fourth column (additional property)
        let newCol04 = document.createElement("td");
        newCol04.innerHTML = objectData[i].getElementsByTagName("value")[2].innerHTML; // Gets the third property value
        newRow.appendChild(newCol04);

        // Append the new row to the table body
        tableBody.appendChild(newRow);
    }
}

// Call the loadXMLDoc function when the page is fully loaded
document.addEventListener('DOMContentLoaded', loadXMLDoc);
