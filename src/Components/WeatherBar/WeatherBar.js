import React from 'react';
import './WeatherBar.css';
// import WeatherResult from '../WeatherResult/WeatherResult';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class WeatherBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {location: ''};
    this.createWeatherHTML = this.createWeatherHTML.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.searchWeather = this.searchWeather.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this)
  }

  renderDisplay(){
    if (this.props.currentWeather.temp) {
      return (
        <div>
          <td>
            <h4>{weekDays[(new Date()).getDay()]}</h4>
            <h4>Temperature: {Math.round(this.props.currentWeather.temp - 273).toFixed(1)} {'\xB0'}C</h4>
            <h4>Condition: {this.props.currentWeather.condition}</h4>
          </td>
          <td>
            <img src={this.props.currentWeather.icon} alt="Weather icon"/>
          </td>
        </div>
      );
    } else {
      return <td>Sorry, no weather data available</td>;
    }
  }

  createWeatherHTML() {
    return (
      <div className="Weather-result">
        <table>
          <tbody>
            <tr>
              {this.renderDisplay()}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  handleLocationChange(e){
    this.setState({location: e.target.value});
  }

  searchWeather(){
    this.props.onSearch(this.state.location);
  }

  render(){
    return (
      <div className="WeatherBar">
         <h3>OpenWeather</h3>
         <br />
         <table>
          <tbody>
             <tr>
               <td><input placeholder="Enter a location" onChange={this.handleLocationChange}/></td>
               <td><button className="WeatherButton" onClick={this.searchWeather}>Get Weather</button></td>
               <td>{this.props.currentWeather.temp ? this.createWeatherHTML() : <p>Search to get weather and song suggestions</p>}</td>
             </tr>
             <tr>
             </tr>
          </tbody>
         </table>
      </div>
    )
  }
}

export default WeatherBar;
