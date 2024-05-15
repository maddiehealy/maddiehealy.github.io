document.addEventListener('DOMContentLoaded', () => {
    const mbid = getMbidFromUrl();
    if (mbid) {
        fetchArtistAlbums(mbid);
    }

    document.getElementById('searchButton').addEventListener('click', () => {
        const artistName = document.getElementById('searchInput').value;
        searchArtist(artistName);
    });

    document.getElementById('searchInput').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const artistName = event.target.value;
            searchArtist(artistName);
        }
    });
});

function getMbidFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('mbid');
}

async function searchArtist(artistName) {
    const searchUrl = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`;
    const resultsContainer = document.getElementById('artistResults');
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        const artists = data.artists;

        if (artists.length === 0) {
            resultsContainer.innerHTML = `<p>No results found for "${artistName}".</p>`;
        } else {
            artists.forEach(artist => {
                const artistLink = document.createElement('a');
                artistLink.href = `./chalkboard_08.html?mbid=${artist.id}`;
                artistLink.textContent = artist.name;
                artistLink.style.display = 'block';

                resultsContainer.appendChild(artistLink);
            });
        }
    } catch (error) {
        console.error('Error fetching artist details:', error);
        resultsContainer.innerHTML = `<p>Error fetching artist details. Please try again later.</p>`;
    }
}

async function fetchArtistAlbums(mbid) {
    const detailsUrl = `https://musicbrainz.org/ws/2/release-group?artist=${mbid}&fmt=json`;
    const albumTable = document.getElementById('albumTable');
    const albumList = document.getElementById('albumList');
    albumList.innerHTML = '';

    try {
        const response = await fetch(detailsUrl);
        const data = await response.json();
        const albums = data['release-groups'];

        if (albums.length === 0) {
            albumTable.style.display = 'none';
            albumList.innerHTML = `<tr><td colspan="2">No albums found.</td></tr>`;
        } else {
            albumTable.style.display = 'table';
            albums.forEach(album => {
                const albumRow = document.createElement('tr');
                const releaseDate = album['first-release-date'] || 'N/A';
                const albumName = album.title;

                albumRow.innerHTML = `
                    <td>${releaseDate}</td>
                    <td>${albumName}</td>
                `;

                albumList.appendChild(albumRow);
            });
        }
    } catch (error) {
        console.error('Error fetching album details:', error);
        albumList.innerHTML = `<tr><td colspan="2">Error fetching album details. Please try again later.</td></tr>`;
    }
}
