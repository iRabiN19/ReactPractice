import React from 'react';
import './App.css';

import Playlist from "../PlayList/PlayList";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      Playlist: "New Playlist",
      playlistTrack: []
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    Spotify.search(term).then(SearchResults => {
      this.setState({ SearchResults: SearchResults });
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTrack;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTrack: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTrack;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filler(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlistTrack: tracks });

  }

  removeTrackSearch(track) {
    let tracks = this.state.SearchResults;
    tracks = tracks.filler(currentTrack => currentTrack.id !== track.id);
    this.setState({ SearchResults: tracks });
  }

  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  updatePlaylistName(name) {
    this.setState({ updatePlaylistName: name });
  }
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri); Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        updatePlaylistName: "New Playlist",
        playlistTracks: []
      });
    });
  }


}
function Apps() {
  return (
    <div>
      <h1>
        <a href="http://localhost:3000">Musicophile</a>
      </h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App playlist">
          <SearchResults searchresults={this.state.searchResults} onAdd={this.dolhese}/>
          <Playlist playlisTracks={this.state.playlistTracks} 
          onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
