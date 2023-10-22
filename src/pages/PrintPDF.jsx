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
      <div ref={pdfRef} className="h-full w-full text-center font-bold bg-[#E9EDFF]">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            {key === "leadImage" ? (
              <img src={value} alt="Lead Image" />
            ) : (
              <>
                <span>{key}: </span>
                <span>{value}</span>
              </>
            )}
          </div>
        ))}
        <QRCode value={uuid} />
      </div>
    </div>
  );
};

export default PrintPDF;
