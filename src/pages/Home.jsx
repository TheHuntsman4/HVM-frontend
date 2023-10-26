import React, { useState, useEffect } from "react";
import bg from "../assets/back.png";
import axios from "axios";
import { useNavigate } from "react-router";
import printerSVG from "../assets/printer.svg";
import { Navbar } from "../components";
import { click } from "@testing-library/user-event/dist/click";

const Home = () => {
  const [data, setData] = useState([]);
  const currentUser = localStorage.getItem("current_user_fullname");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(localStorage.getItem("current_user_fullname"));
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
  const handlePrint = (uuid) => {
    navigate("/print", { state: { uuid: uuid } });
  };
  return (
    <div className="h-screen w-full" style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

      <div className="mx-64 p-12">
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
        <table className="table-auto border border-gray-300">
          <thead>
            <tr>
              <th className="w-1/6 py-2 px-4 border-b">Sl No</th>
              <th className="w-1/6 py-2 px-4 border-b">Full Name</th>
              <th className="w-1/6 py-2 px-4 border-b">Company</th>
              <th className="w-1/6 py-2 px-4 border-b">Department</th>
              <th className="w-1/6 py-2 px-4 border-b">Valid From</th>
              <th className="w-1/6 py-2 px-4 border-b">Valid Till</th>
              <th className="w-1/6 py-2 px-4 border-b"> </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                <td className="w-1/6 py-2 px-4 border-b text-center">
                  {index + 1}
                </td>
                <td className="w-1/6 py-2 px-4 border-b text-center">
                  {item.full_name}
                </td>
                <td className="w-1/6 py-2 px-4 border-b text-center">
                  {item.company_name}
                </td>
                <td className="w-1/6 py-2 px-4 border-b text-center">
                  {item.department}
                </td>
                <td className="w-1/6 py-2 px-4 border-b text-center">
                  {item.visiting_data} {item.visiting_time}
                </td>
                <td className="w-1/6 py-2 px-4 border-b text-center">
                  {formatDateTime(item.valid_till)}
                </td>
                <td>
                <img src={printerSVG} width={20} onClick={() => handlePrint(item.unique_id)} />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
