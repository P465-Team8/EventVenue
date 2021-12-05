import React from "react";
import "./content/UserProfileContent.css";
import { useHistory } from "react-router";
import axios from "axios";

function HostWeddingItem({ name, id, starttime, backendRoot }) {
  var history = useHistory();
  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__info">

        <p className="checkoutProduct__title">{name}</p>

        <p className="checkoutProduct__price">
        <small>{starttime}</small>
        </p>

        <button>
          Edit Wedding
        </button>
        <button>
          View Guests
        </button>
        <button>
          Delete Wedding
        </button>
      </div>
    </div>
  );
}

export default HostWeddingItem;
