import React from "react";
import "./navbar.css";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/amritaLogo.svg";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  console.log(accessToken);
  const handleLogout = () => {
    (async () => {
      try {
        const { data } = await axios.post(
          "https://aims.pythonanywhere.com/api/logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            },
          },
          { withCredentials: true }
        );

        console.log("logout exit");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/";
      } catch (e) {
        console.log("logout not working");
        console.log(e);
      }
    })();
  };
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <nav>
        <nav className="main-nav">
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Link to="/home">
              <img src={logo} alt="AIMS Logo" className="logo" />
            </Link>
          </div>
          <div className="menu-link">
            <ul>
              <li>
                <div className="navlinks">
                  <Link to="/home" className="home">
                    <FaHome />
                  </Link>
                </div>
              </li>
              <li>
                <div className="navlinks">
                  <Link to="/register" className="leadform">
                    <FaUserPlus />
                  </Link>
                </div>
              </li>
              <li>
                <div className="navlinks">
                  <a className="logout" onClick={handleLogout}>
                    <IoLogOut />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
