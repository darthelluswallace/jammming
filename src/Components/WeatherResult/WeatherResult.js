import React from 'react';
import './WeatherResult.css';

class WeatherResult extends React.component {
  constructor(props){
    super(props);
    this.state = {
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  }

  render(){
    return (
      <div className="Weather-result">
        <table>
          <tbody>
            <tr>
              <td>
                <h4>{this.state.weekDays[(new Date()).getDay()]}</h4>
                <h4>Temperature: {Math.round(this.props.currentWeather.temp - 273).toFixed(1)} {'\xB0'}C</h4>
                <h4>Condition: {this.props.currentWeather.condition}</h4>
              </td>
              <td>
                <img src={this.props.currentWeather.img} alt="Weather icon"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default WeatherResult;
