import React, { useState } from "react";
import "./Button.css";
import searchlogo from "../Media/search.png";
import crosslog from "../Media/close.png";

function Button(props) {
  const [status, setStatus] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    return setStatus(true);
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    let value = document.getElementById("query").value;
    setStatus(false);
    props.handleClick(value);
  };

  const handleClose = (e) => {
    e.preventDefault();
    return setStatus(false);
  };

  return (
    <div className="all">
      <form id="form" role="search" className="search">
        <div className="searchButton">
          {status ? (
            <div className="searchBar">
              <input
                type="search"
                id="query"
                placeholder="Search city..."
                className="bar"
              />
              <button id="search" className="button" onClick={handleClick2}>
                <img src={searchlogo} />
              </button>
              <img src={crosslog} className="close" onClick={handleClose} />
            </div>
          ) : (
            <div className="header">
              <p className="city">{props.city}</p>
              <button
                id="opensearch"
                className="buttonOpenInput"
                onClick={handleClick}
              >
                <img src={searchlogo} /> City
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
export default Button;
