import React, { useState } from "react";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Room, User, BookingData } from "../../utils/interfaceTypes";

const Hotel: React.FC = () => {
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms] = useState<Room>(location.state?.room);

  const [hotelName] = useState<string>(location.state?.hotelName);

  const users = JSON.parse(localStorage.getItem("Users") ?? "[]");
  console.log(users, "users --  GGGGGGGGGGG");
  const loggedInUser: User = users.find(
    (user: any) => user.login_status === "login"
  );

  const username: string = loggedInUser ? loggedInUser.username : "";
  const [hotelBookingHistory, setHotelBookingHistory] = useState<BookingData[]>(
    []
  );
  console.log(hotelBookingHistory, "FFFFFF");

  const handleBook = (rooms: Room, hotelName: string) => {
    const bookingData = { username, hotelName, rooms };

    const existingBookingHistory: BookingData[] = JSON.parse(
      localStorage.getItem("hotelBookingHistory") ?? "[]"
    );

    const isDuplicate: boolean = existingBookingHistory.some(
      (entry) =>
        entry.username === username &&
        entry.hotelName === hotelName &&
        entry.rooms.roomName === rooms.roomName
    );

    if (!isDuplicate) {
      const updatedBookingHistory = [...existingBookingHistory, bookingData];

      setHotelBookingHistory(updatedBookingHistory);

      localStorage.setItem(
        "hotelBookingHistory",
        JSON.stringify(updatedBookingHistory)
      );

      console.log(updatedBookingHistory, "RRRR");
    }

    navigate(`/book_historyroom/${rooms.roomName}`, {
      state: { rooms, hotelName },
    });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{rooms?.roomName}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New York</span>
          </div>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img src={photo.src} alt={`Hotel ${i}`} className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">{rooms?.features}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>
                <b> Total Price : ₹ {rooms?.price}</b>
              </h2>
              <button onClick={() => handleBook(rooms!, hotelName!)}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
