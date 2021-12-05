import React from "react";
import "./content/UserProfileContent.css";
import { useHistory } from "react-router";
import axios from "axios";

function VenueManagementItem({ name, guests, backendRoot }) {
  var history = useHistory();
  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__info">
        
        <p className="checkoutProduct__title">{name}</p>

        <p className="checkoutProduct__price">
        <small>Venue Info</small>
        </p>
        
        <button
            onClick={() => (
                console.log(JSON.stringify(guests))
            )}
        >
            Show Reservations
        </button>
      </div>
    </div>
  );
}

export default VenueManagementItem;
