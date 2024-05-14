document.addEventListener('DOMContentLoaded', () => {
    const mbid = getMbidFromUrl();
    if (mbid) {
        fetchInstrumentDetails(mbid);
    }

    document.getElementById('searchButton').addEventListener('click', () => {
        const instrumentName = document.getElementById('instrumentName').value;
        searchInstrument(instrumentName);
    });
});

function getMbidFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('mbid');
}

async function searchInstrument(instrumentName) {
    const searchUrl = `https://musicbrainz.org/ws/2/instrument/?query=${encodeURIComponent(instrumentName)}&fmt=json`;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        const instruments = data.instruments;

        if (instruments.length === 0) {
            resultsContainer.innerHTML = `<p>No results found for "${instrumentName}".</p>`;
        } else {
            instruments.forEach(instrument => {
                const instrumentLink = document.createElement('a');
                instrumentLink.href = `./musicAPI_instrument.html?mbid=${instrument.id}`;
                instrumentLink.textContent = instrument.name;
                instrumentLink.style.display = 'block';

                resultsContainer.appendChild(instrumentLink);
            });
        }
    } catch (error) {
        console.error('Error fetching instrument details:', error);
    }
}

async function fetchInstrumentDetails(mbid) {
    const detailsUrl = `https://musicbrainz.org/ws/2/instrument/${mbid}?fmt=json`;
    const instrumentDetailsContainer = document.getElementById('instrumentDetails');

    try {
        const response = await fetch(detailsUrl);
        const instrument = await response.json();

        instrumentDetailsContainer.innerHTML = `
            <h2>${instrument.name}</h2>
            <p>ID: ${instrument.id}</p>
            <p>Description: ${instrument.description || 'N/A'}</p>
        `;
    } catch (error) {
        console.error('Error fetching instrument details:', error);
    }
}

async function fetchArtistDetails() {
    const artistInput = document.getElementById('artistInput').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistInput)}&fmt=json`);
        const data = await response.json();
        const artists = data.artists;

        if (artists.length === 0) {
            resultsContainer.innerHTML = `<p>No results found for "${artistInput}".</p>`;
        } else {
            artists.forEach(artist => {
                const artistLink = document.createElement('a');
                artistLink.href = `./musicAPI_lookupArtist.html?mbid=${artist.id}`;
                artistLink.textContent = artist.name;
                artistLink.style.display = 'block';

                resultsContainer.appendChild(artistLink);
            });
        }
    } catch (error) {
        console.error('Error fetching artist details:', error);
    }
}
