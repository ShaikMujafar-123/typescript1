import React, { useState, FormEvent } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { User } from "../../utils/interfaceTypes";


const Login: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const storedData: User[] = JSON.parse(
      localStorage.getItem("Users") || "[]"
    );

    const user = storedData.find((data) => {
      return data.username === name && data.password === password;
    });

    if (user) {
      alert("Welcome " + name);

      const updatedData = storedData.map((data) => {
        if (data.username === name && data.password === password) {
          return { ...data, login_status: "login" };
        }
        return data;
      });

      localStorage.setItem("Users", JSON.stringify(updatedData));

      navigate("/");
    } else {
      alert("User does not exist! Register");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="" />
      <div className="login-form-container">
        <div
          style={{ fontWeight: "bold", marginBottom: "20px", fontSize: "25px" }}
        >
          Login to Book
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="loginBtn" type="submit">
            Login
          </button>
          <p className="accountmessage">Don't have an account?</p>{" "}
          <p
            className="regester-button"
            onClick={() => navigate("/registration")}
          >
            Register
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
