import React from "react";
import "./BookmarkItem.css";
import { useHistory } from "react-router";
function BookmarkItem({ name, city, state, id, type }) {
  var history = useHistory();
  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{name}</p>
        {type === "venue" ? 
        <p className="checkoutProduct__price">
          <small>{city}, {state}</small>
        </p> : ""}
        <button
          onClick={() => {
            history.push(`/${type}/${id}`);
          }}
        >
          View {type === "venue" ? "Venue" : "Wedding"}
        </button>
        <button
            onClick={console.log("unbookmark")}
        >
            Unbookmark
        </button>
      </div>
    </div>
  );
}

export default BookmarkItem;
