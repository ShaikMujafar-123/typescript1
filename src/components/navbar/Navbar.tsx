import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { User } from '../../utils/interfaceTypes';

// Define a User interface to represent the structure of user data


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const users: User[] = JSON.parse(localStorage.getItem("Users") || "[]");

  console.log(users, "usersData");

  const loggedInUser  = users.find(
    (user) => user.login_status === "login"
  );

  const handleLogout = () => {
    const updatedLocalData: User[] = users.map((userData) =>
      userData.login_status === "login"
        ? { ...userData, login_status: "" }
        : userData
    );

    localStorage.setItem("Users", JSON.stringify(updatedLocalData));

    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking</span>
        {!loggedInUser ? (
          <div className="navItems">
            <button onClick={() => navigate("/registration")} className="navButton">
              Register
            </button>
            <button onClick={() => navigate("/login")} className="navButton">
              Login
            </button>
          </div>
        ) : (
          <div className="navItems">
            {loggedInUser.username}
            <button onClick={handleLogout} className="navButton">
              Logout
            </button>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
