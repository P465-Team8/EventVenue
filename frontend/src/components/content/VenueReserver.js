import React, { Component } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { Container, Button } from 'react-bootstrap';
import axios from "axios";


class VenueReserver extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.reserveVenue = this.reserveVenue.bind(this);
  }

  componentDidMount() {

  }

  handleSelect (ranges) {
    console.log(ranges)
    this.state.selectionRange.startDate = ranges.selection.startDate;
    this.state.selectionRange.endDate = ranges.selection.endDate;
  }
  
  reserveVenue() {
    var data = new FormData()
    data.append("start_date", this.state.selectionRange.startDate.toISOString());
    data.append("end_date", this.state.selectionRange.endDate.toISOString());
    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    var self = this;
    axios
      .post(this.props.backendRoot + `/api/venue/${self.props.vid}/reserve`, data, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        },
      })
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error);
      });
  }

 
  render() {
    return (
      <Container>
        <DateRange
          editableDateInputs={true}
          onChange={this.handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={[this.state.selectionRange]}
          minDate = {new Date()}
        />
        <Button 
          variant="secondary" 
          onClick={this.reserveVenue}>
         Reserve
        </Button>
      </Container>
    );
  }
  
}

export default VenueReserver;