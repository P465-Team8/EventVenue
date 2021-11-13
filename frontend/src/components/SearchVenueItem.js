import React from "react";
import "./SearchVenueItem.css";
import randomvenueimg from "./randomweddingvenue.jpg";

function SearchVenueItem({ vid, name, city, state, zipcode }) {
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={randomvenueimg} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{name}</p>
        <p className="checkoutProduct__price">
          <small>{vid}</small>
        </p>
        <p className="checkoutProduct__price">
          <small>{city}</small>
        </p>
        <p className="checkoutProduct__price">
          <small>{state}</small>
        </p>
        <p className="checkoutProduct__price">
          <small>{zipcode}</small>
        </p>
        <button>More Info>></button>
      </div>
    </div>
  );
}

export default SearchVenueItem;
