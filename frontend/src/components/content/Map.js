import { Map, GoogleApiWrapper } from 'google-maps-react';


    <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />

      export default GoogleApiWrapper({
        apiKey: 'AIzaSyBlSErvF35FIXJ2K6XG7hN7BJtrEplUHEA'
      })(MapContainer);