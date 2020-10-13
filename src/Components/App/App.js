// import logo from './logo.svg';
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import WeatherBar from '../WeatherBar/WeatherBar';
import OpenWeather from '../../util/OpenWeather';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      weather: {},
      playerURI: ''
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.selectTrack = this.selectTrack.bind(this);
  }

  // method adds a track to the playlist if it is not there already
  // addTrack(track) {
  //   if (!this.state.playlistTracks.find(playlistTrack => {
  //       return track.id === playlistTrack.id;
  //     })) {
  //       let newPlaylist = this.state.playlistTracks.push(track);
  //       this.setState({
  //         playlistTracks: newPlaylist
  //       });
  //     }
  // }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  // method removes track from playlist using filter which is non mutating
  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => {
        return track.id !== playlistTrack.id;
      })
    });
  }

  // allows user to change the playlist name
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  selectTrack(track) {
    this.setState({playerURI: track});
  }

  async search(term) {
    let searchResults = await Spotify.search(term);
    this.setState({searchResults: searchResults});
    console.log(searchResults);
  }

  async getWeather(location) {
    let currentWeather = await OpenWeather.getForecast(location);
    if (currentWeather){
      this.setState({weather: currentWeather});
    } else {
      this.setState({weather: {}})
    }
    console.log(currentWeather);
  }

  render() {
    return (
      <div>
       <h1>Ja<span className="highlight">mmm</span>ing</h1>
       <WeatherBar currentWeather={this.state.weather} onSearch={this.getWeather} />
       <div className="App">
         <SearchBar onSearch={this.search} />
         <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onSelect={this.selectTrack}/>
           <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist} />
         </div>
       </div>
       <div>
        {this.state.playerURI ? <AudioPlayer selectedURI={this.state.playerURI}/> : <h2>Select a song to play it</h2>}
       </div>
     </div>
    );
  }
}


export default App;
