import React from "react";
import { useLocation, useNavigate } from "react-router";
import printerSVG from "../assets/printer.svg";
import peopleSVG from "../assets/associates.svg";
import bg from "../assets/back.png";

const NavigateLead = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const uuid = location.state?.uuid;

  const handlePrint = () => {
    navigate("/print", { state: { uuid: uuid } });
  };

  const handleAccompanying=()=>{
    
  }
  return (
    <div
      className="h-screen w-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="z-10 h-full w-full flex justify-center items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-full w-full p-4 rounded-lg bg-white shadow-black shadow-md flex flex-col justify-center items-center">
            <img src={printerSVG} width={50} />
            <div className="">
              <p>To continue printing the pass</p>
              <p>Click the button below</p>
              <button onClick={handlePrint}></button>
            </div>
          </div>
          <div>Hello There {uuid}</div>
        </div>
      </div>
    </div>
  );
};

export default NavigateLead;
