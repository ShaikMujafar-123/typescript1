import React, { useState } from "react";
import "./header.css";
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBed,faCalendarDays,faPerson,} from "@fortawesome/free-solid-svg-icons";
import { Options, HeaderProps,RangeState } from '../../utils/interfaceTypes';



const Header: React.FC<HeaderProps> = ({ type }) => {
  const [destination, setDestination] = useState<string>("");
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [date, setDate] = useState<RangeState[]>([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name: keyof Options, operation: "i" | "d")  => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    if (destination && date && options) {
      navigate("/hotels", { state: { destination, date, options } });
    } else {
      alert("Please fill all details");
    }
  };

  const handleSignin = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free booking account
            </p>
            <button onClick={handleSignin} className="headerBtn">
              Sign in / Register
            </button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  required
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {date[0].endDate
                    ? `${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                        date[0].endDate,
                        "MM/dd/yyyy"
                      )}`
                    : "Select dates"}
                </span>
                {openDate && (
                  <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    if (item.selection) {
                      console.log(item,"YYYYYYYY")
                      setDate([
                        {
                          startDate: item.selection.startDate || new Date(),
                          endDate: item.selection.endDate || null,
                          key: 'selection',
                        },
                      ]);
                    }
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={date.map((d) => ({
                    startDate: d.startDate || new Date(),
                    endDate: d.endDate || null,
                    key: d.key,
                  })) as any} 
                  className="date"
                  minDate={new Date()}
                />
                
                
                
                
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
