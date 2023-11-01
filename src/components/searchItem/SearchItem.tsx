import React from "react";
import "./searchItem.css";
import { useNavigate } from "react-router-dom";
import { User, SearchItemProps, Room } from "../../utils/interfaceTypes";

const SearchItem: React.FC<SearchItemProps> = ({
  hotelName,
  hotelDesc,
  room,
}) => {
  const navigate = useNavigate();

  // Parse the 'Users' local storage item and provide an empty array as a default if it's not found
  const users: User[] = JSON.parse(localStorage.getItem("Users") || "[]");

  const loggedInUser = users.find((user) => user.login_status === "login");

  const handleAvailabilty = (hotelName: string, room: Room)   => {
    if (loggedInUser?.login_status === "login") {
      navigate(`/hotels/:${hotelName}`, { state: { room, hotelName } });
    } else {
      alert("Please Login to Check");
    }
  };
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h3 className="siSubtitle">{hotelName}</h3>
        <h4 className="siSubtitle">{room.roomName} is available</h4>
        <span className="siFeatures">{hotelDesc}</span>
        <div className="siRating">
          <button>8.9</button>
        </div>
      </div>
      <div className="siDetailTexts">
        <span className="siPrice">₹ {room.price}</span>
        <button
          onClick={() => handleAvailabilty(hotelName, room)}
          className="siCheckButton"
        >
          See availability
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
