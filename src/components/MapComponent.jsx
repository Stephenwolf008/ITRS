import React, { Component } from 'react';
import { initMap } from '../components/Map';

class MapComponent extends Component {
  componentDidMount() {
    initMap();
  }

  render() {
    return (
      <div id="map">
        {/* Map container */}
      </div>
    );
  }
}

export default MapComponent;