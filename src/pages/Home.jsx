import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../components";

const Home = () => {
  const [data, setData] = useState([]);
  const currentUser = localStorage.getItem("current_user");

  const getVisitors = async () => {
    try {
      console.log(localStorage.getItem("current_user"));
      const response = await axios.get(
        "https://aims.pythonanywhere.com/api/visitors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setData(response.data.lead_visitor);
      console.log(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  return (
    <div className="h-full w-full">
      <div className="mx-64 mt-12">
        <div className="font-Heading font-semibold">
          <p className="text-xl">Greetings</p>
          <p className="text-xl">{currentUser}</p>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="font-bold">Sl No</div>
          <div className="font-bold">Full Name</div>
          <div className="font-bold">Company</div>
          <div className="font-bold">Department</div>
          <div className="font-bold">Valid From</div>
          <div className="font-bold">Valid Till</div>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <div>{index + 1}</div>
              <div>{item.full_name}</div>
              <div>{item.company_name}</div>
              <div>{item.department}</div>
              <div>{item.visiting_date} {item.visiting_time}</div>
              <div>{item.valid_till}</div>
            </React.Fragment>
          ))}
        </div>
        <button className="bg-amritaOrange w-full p-4" onClick={getVisitors}>
          Click Me
        </button>
      </div>
    </div>
  );
};

export default Home;
