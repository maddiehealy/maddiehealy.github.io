function searchArtist() {
    const searchInput = document.getElementById('searchInput').value;
    const baseUrl = 'https://musicbrainz.org/ws/2/artist/?query=';
    const format = '&fmt=json';

    fetch(`${baseUrl}${searchInput}${format}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => console.log('Error fetching artist data:', error));
}

function displayResults(data) {
    const artistResults = document.getElementById('artistResults');
    artistResults.innerHTML = '';

    if (data.artists && data.artists.length > 0) {
        const artists = data.artists;
        const resultList = document.createElement('ul');

        artists.forEach(artist => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = artist.name;
            link.href = '#';
            link.addEventListener('click', () => {
                fetchAlbums(artist.id);
            });
            listItem.appendChild(link);
            resultList.appendChild(listItem);
        });

        artistResults.appendChild(resultList);
    } else {
        artistResults.textContent = 'No artists found.';
    }
}

function fetchAlbums(artistId) {
    const baseUrl = 'https://musicbrainz.org/ws/2/release/?artist=';
    const format = '&fmt=json';

    fetch(`${baseUrl}${artistId}${format}`)
        .then(response => response.json())
        .then(data => {
            displayAlbums(data.releases);
        })
        .catch(error => console.log('Error fetching album data:', error));
}

function displayAlbums(albums) {
    const albumTable = document.getElementById('albumTable');
    const albumList = document.getElementById('albumList');
    albumList.innerHTML = '';

    if (albums && albums.length > 0) {
        albumTable.style.display = 'block';
        albums.forEach(album => {
            const row = document.createElement('tr');
            const releaseDateCell = document.createElement('td');
            releaseDateCell.textContent = album.date;
            const albumNameCell = document.createElement('td');
            const albumLink = document.createElement('a');
            albumLink.textContent = album.title;
            albumLink.href = '#';
            albumLink.addEventListener('click', () => {
                fetchAlbumInfo(album.id);
            });
            albumNameCell.appendChild(albumLink);
            const tracksCell = document.createElement('td');
            tracksCell.textContent = album['track-count'];
            row.appendChild(releaseDateCell);
            row.appendChild(albumNameCell);
            row.appendChild(tracksCell);
            albumList.appendChild(row);
        });
    } else {
        albumTable.style.display = 'none';
    }
}

function fetchAlbumInfo(albumId) {
    const baseUrl = 'https://musicbrainz.org/ws/2/release/';
    const format = '?inc=artists+recordings&fmt=json';

    fetch(`${baseUrl}${albumId}${format}`)
        .then(response => response.json())
        .then(data => {
            displayAlbumInfo(data);
        })
        .catch(error => console.log('Error fetching album info:', error));
}

function displayAlbumInfo(album) {
    const albumInfoTable = document.createElement('table');
    albumInfoTable.classList.add('table', 'table-bordered', 'table-striped', 'mt-3');
    albumInfoTable.innerHTML = `
        <thead>
            <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Release Date</th>
                <th>Tracks</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${album.title}</td>
                <td>${album['artist-credit'][0].artist.name}</td>
                <td>${album.date}</td>
                <td>${album.media[0]['track-count']}</td>
            </tr>
        </tbody>
    `;

    const albumTableContainer = document.getElementById('albumTable');
    albumTableContainer.innerHTML = '';
    albumTableContainer.appendChild(albumInfoTable);
}