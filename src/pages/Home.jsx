import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [data,setData] = useState([])

  const getVisitors = async () => {
    try {
      console.log(localStorage.getItem("current_user"))
      const response = await axios.get("http://localhost:8000/api/visitors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setData(response.data.lead_visitor);
      console.log(data)
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  return (
    <div className="h-screen w-full">
      <button className="bg-amritaOrange w-full p-4" onClick={getVisitors}>
        Click Me
      </button>
      <div className="w-full h-full grid">
        {data.map((item,index)=>
          <div className="text-black" key={index}>{item.full_name}</div>
        )}
      </div>
    </div>
  );
};

export default Home;
