import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { CirclesWithBar } from "react-loader-spinner";
import axios from "axios";
import logoSVG from "../assets/amritaLogo.svg";
import { useReactToPrint } from "react-to-print";
import Pass from "../components/passComponent";
import "./print.css";

const PrintPDF = () => {
  const location = useLocation();
  const uuid=location.state.uuid
  const token = localStorage.getItem("access_token");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://aims.pythonanywhere.com/api/visitors?unique_id=${uuid}`;
  
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const leadData = data?.lead_visitor[0];
  console.log(data?.leadImage);

  const pdfRef = useRef(null);
  const printPDF = useReactToPrint({
    documentTitle: "tickets.pdf",
    content: () => pdfRef.current,
  });
  function formatDateTime(dateStr) {
    const dateObj = new Date(dateStr);
  
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = dateObj.getFullYear();
  
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <CirclesWithBar
            height="100"
            width="100"
            color="#F48221"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      ) : (
        <div>
          <button
            onClick={printPDF}
            className="px-6 py-4 bg-amber-600 text-black font-semibold"
          >
            Print
          </button>
          <div
            ref={pdfRef}
            className="h-full w-full flex flex-col justify-center items-center"
          >
            <Pass
              uuid={uuid}
              fullName={leadData?.full_name}
              companyName={leadData?.company_name}
              validFromDate={leadData?.visiting_date}
              validFromTime={(leadData?.visiting_time)}
              validTill={formatDateTime(leadData?.valid_till)}
              visitee={leadData?.visitee}
              department="someplace"
              imageSrc={leadData?.image}
            />
            {data?.accompanying.map((accompany, index) => (
              <Pass
                key={index}
                uuid={uuid}
                fullName={accompany?.full_name}
                companyName={leadData?.company_name}
                validFromDate={leadData?.visiting_date}
                validFromTime={(leadData?.visiting_time)}
                validTill={formatDateTime(leadData?.valid_till)}
                visitee={leadData?.visitee}
                department="someplace"
                imageSrc={accompany?.image}
                className="page-break"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintPDF;
