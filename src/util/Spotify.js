const clientId = '';
const redirectURI = 'http://localhost:3000/';
// const redirectURI = 'http://jammmingbeans.surge.sh/';
let accessToken;
let expiresIn = '';

const Spotify = {
  // Gets user access token using Implicit Grant method
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = Number(window.location.href.match(/expires_in=([^&]*)/)[1]);
      // Below code expires access token after some time
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      // Code below removes access token from URL
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  async search(term) {
    try {
      const accessToken = Spotify.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.tracks) {
          console.log(jsonResponse)
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            iFrame: `https://open.spotify.com/embed/track/${track.uri}`
          }));
        } else {
          return [];
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(name, trackURIs) {
    if (name && trackURIs) {
      const userAccessToken = Spotify.getAccessToken();
      let headers = {
        Authorization: `Bearer ${userAccessToken}`
      };
      let userID = '';
      try {
        let response = await fetch('https://api.spotify.com/v1/me', {
          headers: headers
        });
        if (response.ok) {
          let jsonResponse = await response.json();
          userID = jsonResponse.id;

          let createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
              name: name
            })
          });
          if (createPlaylistResponse.ok) {
            let createPlaylistJson = await createPlaylistResponse.json();
            let playlistID = createPlaylistJson.id;

            let addToPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({
                uris: trackURIs
              })
            });
            if (addToPlaylistResponse.ok) {
              let addToPlaylistJson = await addToPlaylistResponse.json();
              playlistID = addToPlaylistJson.id;
            }
          }

        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }

  // savePlaylist(name, trackUris) {
  //   if (!name || !trackUris.length) {
  //     return;
  //   }
  //
  //   const accessToken = Spotify.getAccessToken();
  //   const headers = { Authorization: `Bearer ${accessToken}` };
  //   let userId;
  //
  //   return fetch('https://api.spotify.com/v1/me', {headers: headers}
  //   ).then(response => response.json()
  //   ).then(jsonResponse => {
  //     userId = jsonResponse.id;
  //     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  //       headers: headers,
  //       method: 'POST',
  //       body: JSON.stringify({name: name})
  //     }).then(response => response.json()
  //     ).then(jsonResponse => {
  //       const playlistId = jsonResponse.id;
  //       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
  //         headers: headers,
  //         method: 'POST',
  //         body: JSON.stringify({uris: trackUris})
  //       });
  //     });
  //   });
  // }

};

export default Spotify;
