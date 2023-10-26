import React from "react";
import "./navbar.css";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/amritaLogo.svg";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

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
                  <Link to="/leadform" className="leadform">
                    <FaUserPlus />
                  </Link>
                </div>
              </li>
              <li>
                <div className="navlinks">
                  {isAuth ? (
                    <Link to="/logout" className="logout">
                      <IoLogOut />
                    </Link>
                  ) : (
                    <Link to="/" className="logout">
                      <IoLogIn />
                    </Link>
                  )}
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
