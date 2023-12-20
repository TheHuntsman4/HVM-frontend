import React, { useState, useEffect } from "react";
import bg from "../assets/back.png";
import axios from "axios";
import { useNavigate } from "react-router";
import printerSVG from "../assets/printer.svg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 15;

const Home = () => {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem("current_user_fullname");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("cached_lead_visitor");

        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
        }

        const response = await axios.get(
          "https://aims.pythonanywhere.com/api/visitors",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const newData = response.data.lead_visitor.reverse();

        if (JSON.stringify(newData) !== cachedData) {
          localStorage.setItem("cached_lead_visitor", JSON.stringify(newData));

          setData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        setLoading(false);
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

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderPagination = () => {
    const visiblePages = 5;

    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`mx-2 px-4 py-2 rounded-full ${
            currentPage === i
              ? "bg-[#f58220] text-white"
              : "bg-gray-300 font-bold"
          } transform transition-transform hover:scale-110 transition-200`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-6">
        <button
          className={`mx-2 px-4 py-2 rounded-full ${
            currentPage === 1 ? "bg-gray-300" : "bg-[#f58220] text-white"
          }`}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded-full ${
            currentPage === 1 ? "bg-gray-300" : "bg-[#f58220] text-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
        {pages}
        <button
          className={`mx-2 px-4 py-2 rounded-full hover:animate-pulse transition-100 ${
            currentPage === totalPages
              ? "bg-gray-200"
              : "bg-[#f58220] text-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-[#f58220] text-white"
          }`}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    );
  };
  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-repeat min-h-screen"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="mx-64 p-12 drop-shadow-sm">
          <div className="bg-white bg-opacity-75 p-4 rounded-md mb-4 flex justify-between items-center">
            <p className="font-Heading font-semibold text-xl">
              Namah Shivaya, {currentUser}
            </p>
            <a href="/leadform">
              <button className="px-4 py-2 rounded-full bg-[#f58220] text-white hover:bg-black transition-200">
                Add Lead Visitor
              </button>
            </a>
          </div>
          <br />
          {Loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto drop-shadow-2xl">
              <table className="min-w-full border-white border-[3px]">
                <thead className="bg-[#ff9e4f] border-white border-[3px]">
                  <tr>
                    <th className="py-3 px-4 text-right">S.No</th>
                    <th className="py-3 px-4 text-left">Full Name</th>
                    <th className="py-3 px-4 text-left">Company</th>
                    <th className="py-3 px-4 text-left">Department</th>
                    <th className="py-3 px-4 text-right">Valid From</th>
                    <th className="py-3 px-4 text-right">Valid Till</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-orange-100" : "bg-white"}
                    >
                      <td className="py-2 px-4 text-right">{index + 1}</td>
                      <td className="py-2 px-4 ">{item.full_name}</td>
                      <td className="py-2 px-4 ">{item.company_name}</td>
                      <td className="py-2 px-4 text-left">{item.department}</td>
                      <td className="py-2 px-4">
                        <div className="text-right">
                          <div className="font-bold">
                            {new Intl.DateTimeFormat("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(item.visiting_date))}
                          </div>
                          <div className="text-sm">
                            {new Intl.DateTimeFormat("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }).format(new Date(item.visiting_date))}
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="text-right">
                          <div className="font-bold">
                            {new Intl.DateTimeFormat("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(item.valid_till))}
                          </div>
                          <div className="text-sm">
                            {new Intl.DateTimeFormat("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }).format(new Date(item.valid_till))}
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <img
                          src={printerSVG}
                          alt="Print"
                          width={20}
                          onClick={() => handlePrint(item.unique_id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination controls */}
          {totalPages > 1 && renderPagination()}{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
