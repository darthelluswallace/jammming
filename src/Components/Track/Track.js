import './Track.css';
import React from 'react';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  renderAction(){
    if(this.props.isRemoval === 'true'){
      return (
        <button onClick={this.removeTrack} className="Track-action">-</button>
      );
    } else {
      return (
        <button onClick={this.addTrack} className="Track-action">+</button>
      );
    }
  }

  handleSelectChange() {
    let selectedURI = this.props.track.uri;
    this.props.onSelect(selectedURI);
    console.log(selectedURI);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render(){
    return (
      <div className="Track" onClick={this.handleSelectChange}>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{`${this.props.track.artist} | ${this.props.track.album}`}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
