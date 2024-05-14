function searchInstrument() {
    var instrumentName = document.getElementById('instrumentname').value;
    var searchUrl =  `https://musicbrainz.org/ws/2/instrument/?query=${encodeURIComponent(instrumentName)}&fmt=json`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displaySearchResults(data))
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.instruments && data.instruments.length >0) {
        data.instruments.forEach(instrument => {
            var instrumentInfo = document.createElement('p');
            instrumentInfo.innerHTML = `Instrument: ${instrument.name} <br> MBID: ${instrument.id}`;
            instrumentInfo.style.cursor = 'pointer';
            instrumentInfo.onclick = function() { fetchInstrumentDetails{instrument.id}; };
            resultsDiv.appendChild(instrumentInfo);
        });
    } else {
        resultsDiv.innerHTML = "No instruments found";
    }
}

document.getElementById('searchButton').addEventListener('click', function() {
    var mbid = document.getElementById('instrumentName').value;
    if (mbid.trim()) {
        fetchInstrumentDetails(mbid);
    } else {
        alert("Please enter a valid MBID.")
    }
});

function fetchInstrumentDetails(mbid) {
    var detailsUrl = `https://musicbrainz.org/ws/2/instrument/?query=${encodeURIComponent(instrumentName)}&fmt=json`;

    fetch(detailsUrl)
        .then(response => response.json())
        .then(data => displayInstrumentDetails(data))
        .catch(error => console.error('Error:', error));
}

function displayInstrumentDetails(instrument) {
    var detailsDiv = document.getElementById('instrumentDetails');
    detailsDiv.innerHTML = '';

    if (instrument) {
        var instrumentInfo = document.createElement('p');
        instrumentInfo.innerHTML = `Name: ${instrument.name}<br>` +
                                   `MBID: ${instrument.id}<br>` +
                                   `Description: ${instrument.description || "No description available"}<br>`
                                   `Disambiguation: ${instrument.disambiguation || "None"}`;
        detailsDiv.appendChild(instrumentInfo);
    } else {
        detailsDiv.innerHTML = "No instrument found with the given MBID";
    }
}