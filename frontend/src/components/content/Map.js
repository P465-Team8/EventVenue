import React, { Component } from 'react';
import axios from "axios";
import { Map, GoogleApiWrapper, InfoWindow, Marker, google } from 'google-maps-react';
import { intervalToDuration } from 'date-fns';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      address: new String,
      INITIAL_LOCATION: {
        latitude: 0,
        longitude: 0
      } 
    };
  }
  
  geocodeAddress(address) {
    var ATLANTIC_OCEAN = {
      latitude: 29.532804,
      longitude: -55.491477
    }
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
  
      if (status === google.maps.GeocoderStatus.OK) {
  
        this.state.INITIAL_LOCATION.latitude = results[0].geometry.location.lat
        this.state.INITIAL_LOCATION.longitude = results[0].geometry.location.lng
  
        return;
      }
      
        this.state.INITIAL_LOCATION.latitude = ATLANTIC_OCEAN.latitude
        this.state.INITIAL_LOCATION.longitude = ATLANTIC_OCEAN.longitude
    
    }.bind(this))
  }

  componentDidMount() {
    var self = this;

    this.state.address = this.props.street_address + " " + this.props.city + " " + this.props.state + " " + this.props.zipcode
    
    this.geocodeAddress(encodeURIComponent(this.state.address))
    console.log(this.state.address)
    console.log(this.state.INITIAL_LOCATION)
    
    this.map = new google.map.Map(this.mapElement, {
      zoom: 8,
      center: {
        lat: this.state.INITIAL_LOCATION.latitude,
        lng: this.state.INITIAL_LOCATION.longitude
      }
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: this.state.INITIAL_LOCATION.latitude,
        lng: this.state.INITIAL_LOCATION.longitude
      }
    });
  }
  
  render(){
    <div className="map" ref={this.setMapElementReference}></div>
  }

}