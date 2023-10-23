import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import logoSVG from "../assets/amritaLogo.svg";
import { useReactToPrint } from "react-to-print";
import Pass from "../components/passComponent";

const PrintPDF = () => {
  const location = useLocation();
  const data = {
    lead_visitor: [
      {
        id: 13,
        full_name: "Aniketh Vijesh",
        company_name: "something",
        address: "Sainiketh",
        email: "am.en.u4aie22009@am.students.amrita.edu",
        contact_number: "123456789",
        image: "best stuff",
        official_documentation: null,
        visitee: "somoene",
        visiting_date: "2023-10-23",
        visiting_time: "14:38:29",
        unique_id: "351b8ac5-bbce-4a5b-a63d-da9c65e08c60",
        valid_till: "2023-10-23T20:38:29+05:30",
        created_by: 1,
      },
    ],
    accompanying: [
      {
        id: 12,
        lead_visitor_id: "351b8ac5-bbce-4a5b-a63d-da9c65e08c60",
        full_name: "someguy",
        email: "test@test.com",
        contact_number: "12345678",
        unique_id: "190cc88f-6c71-40c9-bd10-60ab21993a26",
        image: "stu",
        created_by: null,
      },
      {
        id: 13,
        lead_visitor_id: "351b8ac5-bbce-4a5b-a63d-da9c65e08c60",
        full_name: "somepther guy",
        email: "test2@test.com",
        contact_number: "12345321234",
        unique_id: "29cebaea-90a8-423f-87f8-ccdca67e3978",
        image: "stuff",
        created_by: 1,
      },
    ],
  };

  const leadData = data.lead_visitor[0];
  const uuid = "351b8ac5-bbce-4a5b-a63d-da9c65e08c60";
  console.log(data.leadImage);

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
        <Pass
          uuid={uuid}
          fullName={leadData.full_name}
          companyName={leadData.company_name}
          validFromDate={leadData.visiting_date}
          validFromTime={leadData.visiting_time}
          validTill={leadData.valid_till}
          visitee={leadData.visitee}
          department="someplace"
          imageSrc={leadData.image}
        />
        {data.accompanying.map((accompany) => (
          <Pass
            uuid={uuid}
            fullName={accompany.full_name}
            companyName={leadData.company_name}
            validFromDate={leadData.visiting_date}
            validFromTime={leadData.visiting_time}
            validTill={leadData.valid_till}
            visitee={leadData.visitee}
            department="someplace"
            imageSrc={accompany.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PrintPDF;
