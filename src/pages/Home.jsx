import React from "react";
import axios from "axios";

const Home = () => {
  const getVisitors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/visitors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  return (
    <div className="h-screen w-full">
      <button className="bg-amritaOrange w-full p-4" onClick={getVisitors}>
        Click Me
      </button>
    </div>
  );
};

export default Home;
