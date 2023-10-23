import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

const PrintPDF = () => {
  const location = useLocation();
  const data = location.state?.data;
  const uuid = location.state?.uuid;
  console.log(data);

  const pdfRef = useRef(null);
  const printPDF = useReactToPrint({
    documentTitle: "tickets.pdf",
    content: () => pdfRef.current,
  });

  return (
    <div className="h-full w-full">
      <button
        onClick={printPDF}
        className="px-6 py-4 bg-amber-600 text-black font-semibold"
      >
        Print
      </button>
      <div ref={pdfRef} className="h-full w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full p-4 border-2 border-black">
            <div className="grid grid-cols-4 gap-2">
              <div className="text-black font-semibold text-start">
                <p>Full Name</p>
                <p>Company Name</p>
                <p>Visitng Faculty</p>
                <p>Department</p>
              </div>
              <div className="text-black font-semibold text-start">
                <p>{data.leadFullName}</p>
                <p>{data.companyName}</p>
                <p>{data.FaccultyFullName}</p>
                <p>{data.department}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={data.leadImage} className="h-full w-full" />
              </div>
              <div className="">
                <QRCode value={uuid} className="h-1/2 mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPDF;
