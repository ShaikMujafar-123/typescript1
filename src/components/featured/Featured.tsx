import React from "react";
import "./featured.css";
import { TrendingDestinations } from "../../utils/config";

const Featured: React.FC = () => {
  return (
    <div className="featured">
      {TrendingDestinations.map((place, i) => (
        <div className="featuredItem" key={i}>
          <img src={place.placeImg} alt="" className="featuredImg" />
          <div className="featuredTitles">
            <h1>{place.placeName}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
