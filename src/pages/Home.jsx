import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import printerSVG from "../assets/printer.svg";
import { Navbar } from "../components";
import { click } from "@testing-library/user-event/dist/click";

const Home = () => {
  const [data, setData] = useState([]);
  const currentUser= localStorage.getItem("current_user_fullname");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);
  function formatDateTime(dateStr) {
    const dateObj = new Date(dateStr);

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = dateObj.getFullYear();

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  const handlePrint = (uuid) =>{
navigate("/print",{ state: { uuid: uuid } })
  }
  return (
    <div className="h-full w-full">
      <div className="mx-64 mt-12">
        <div className="font-Heading font-semibold flex justify-between">
          <p className="text-xl">Greetings, {currentUser}</p>
          <a href="/leadform" className="float-right">
            <button className="px-4 py-2 rounded-full bg-[#f58220] text-white">
              Add Lead Visitor
            </button>
          </a>
        </div>
        <br />
        <br />
        <br />
        <div className="grid grid-cols-6 gap-2">
          <div className="font-bold">S.No</div>
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
              <div>
                {item.visiting_date} {item.visiting_time}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>{formatDateTime(item.valid_till)}</div>
                <img
                  src={printerSVG}
                  width={20}
                  onClick={() => handlePrint(item.unique_id)
                  }
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;