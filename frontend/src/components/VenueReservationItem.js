import React from "react";
import "./content/UserProfileContent.css";
import { useHistory } from "react-router";
import axios from "axios";

function VenueReservationItem({ name, city, state, id, type, startDate, endDate, backendRoot }) {
  var history = useHistory();
  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{name}</p>
        {type === "venue" ? 
        <p className="checkoutProduct__price">
          <small>{city}, {state}</small>
        </p> : 
        <p className="checkoutProduct__price">
        <small>{starttime}</small>
      </p>}
        <button
          onClick={() => {
            history.push(`/venue/${id}`);
          }}
        >
          View Venue
        </button>
        <button>
          Unreserve
        </button>
        <button>
          Create Wedding
        </button>
      </div>
    </div>
  );
}

export default VenueReservationItem;
