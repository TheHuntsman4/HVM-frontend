import bg from "../assets/back.png";
import React from "react";
import { useState } from "react";
import GetUsername from "../services/GetUserName";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };
    try {
      const { data } = await axios.post(
        "https://aims.pythonanywhere.com/api/token/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      localStorage.clear();
      localStorage.setItem("current_user",user.username)
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;
      GetUsername({ username });

      window.location.href = "/leadform";
      
    } catch (error) {
      const statusCode = error.response.status
      if (statusCode === 401){
        toast.error('Wrong credentials entered', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      else if (statusCode===400){
        toast.error('One or more required fields is empty', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      console.log(error.response.status)
    }
  };
  return (
    <div
      className="bg-back-login h-[100vh]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-center justify-center h-full w-full bg-no-repeat bg-cover bg-center">
        <div className="flex bg-white/30 h-[30rem] w-[45rem] rounded-3xl shadow-xl backdrop-blur-sm px-32">
          <form
            className="flex flex-col w-full justify-center items-center"
            onSubmit={submit}
          >
            <div className="flex flex-col gap-11 w-full mb-10 justify-center items-center">
              <input
                className="h-16 text-2xl rounded-lg p-5"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="h-16 text-2xl rounded-lg p-5"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#f58220] w-40 text-white h-16 rounded-3xl font-bold text-xl"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
