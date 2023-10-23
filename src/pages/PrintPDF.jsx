import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import logoSVG from "../assets/amritaLogo.svg";
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
      <div
        ref={pdfRef}
        className="h-full w-full flex flex-col justify-center items-center"
      >
        <div className="w-1/2 border-black border-2">
          <div className="w-full p-4 bg-amritaOrange flex justify-center">
            <img
              src={logoSVG}
              className="p-4 border-[2px] border-black rounded-md shadow-lg"
            />
          </div>
          <p className="p-8 text-center text-3xl font-bold">Visiting Pass</p>
          {/* part which handles the image and QR code */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="aspect-w-1 aspect-h-1 p-4">
              <img src={data.leadImage} className="object-cover" />
            </div>
            <div className="aspect-w-1 aspect-h-1 flex items-center justify-center p-4">
              <QRCode value={uuid} className="object-contain" />
            </div>
          </div>
          <div className="w-full p-4 grid grid-cols-2 gap-4 text-start font-semibold text-lg"></div>
        </div>

        {/* <div className="w-full p-4 border-2 border-black">
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
                
              </div>
              <div className="">
                
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default PrintPDF;
