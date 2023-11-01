import React, { useState } from "react";
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
// import { format } from "date-fns";
// import { DateRange, DateRangeProps } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import {
  Hotel,
  BookingData,
  Room,
  IPropertyTypes,
} from "../../utils/interfaceTypes";

const List: React.FC = () => {
  const location = useLocation();

  const [destination] = useState<string>(location.state?.destination);

  const [date] = useState<string>(location.state?.date);

  //   const [openDate, setOpenDate] = useState<boolean>(false);

  const [options] = useState<{ adult: number; children: number }>(
    location.state?.options
  );

  const HOTELS_DATA: IPropertyTypes[] = JSON.parse(
    localStorage.getItem("inventory") || "[]"
  );

  const existingBookingHistory: BookingData[] = JSON.parse(
    localStorage.getItem("hotelBookingHistory") || "[]"
  );

  const filterHotelsAndRooms = () => {
    if (destination && options && date) {
      const filteredRooms: {
        hotelName: string;
        hotelDesc: string;
        roomName: Room;
      }[] = [];

      HOTELS_DATA.forEach((property) => {
        if (property.hotels) {
          property.hotels.forEach((hotel: Hotel) => {
            if (hotel.location === destination) {
              if (hotel.roomsData) {
                hotel.roomsData.forEach((room: Room) => {
                  if (
                    room.adults >= options.adult &&
                    room.childrens <= options.children
                  ) {
                    filteredRooms.push({
                      hotelName: hotel.hotelName,
                      hotelDesc: hotel.hotelDesc,
                      roomName: room,
                    });
                  }
                });
              }
            }
          });
        }
      });

      return filteredRooms;
    }
    return [];
  };

  const filteredRooms = filterHotelsAndRooms();
  console.log(filteredRooms, "KKKKKKK");

  const filteredData1 = filteredRooms.filter((item1) => {
    return !existingBookingHistory.some(
      (item2) =>
        item1.hotelName === item2.hotelName &&
        item1.roomName.roomName === item2.rooms.roomName
    );
  });

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {filteredData1.map((hotelRoomData, index) => (
              <SearchItem
                key={index}
                hotelName={hotelRoomData.hotelName}
                hotelDesc={hotelRoomData.hotelDesc}
                room={hotelRoomData.roomName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
