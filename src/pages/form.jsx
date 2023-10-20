import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useForm } from "react-hook-form";
import { FormComponent } from "../components";
import addSVG from "../assets/add.svg";
const Mainform = () => {
  leadForm = useForm();
  const {register,control} =leadForm
  const handleSubmit = () => {
    console.log("submitting");
  };
  const addForm = () => {
    setFormComponents((prevComponents) => [
      ...prevComponents,
      <FormComponent key={prevComponents.length} />,
    ]);
  };

  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(0);

  const webCamRef = useRef(null);


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const captureWebcam = () => {
    setImageSrc(webCamRef.current.getScreenshot());
    console.log(imageSrc);
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="font-semibold text-amber-600">
        this is the mainform area
      </h1>
      <div className="h-full w-full">
        <div className="h-auto p-6 w-1/2 bg-[#E9EDFF]">
          <div className="flex flex-col">
            <label>Full Name</label>
            <input type="text" id="leadFullName"  />
            <label>Company Name</label>
            <input type="text" id='companyName' />
            <label>Phone Number</label>
            <input type="number" id='leadPhoneNumber'/>
            <label>Email</label>
            <input type="email" id='leadEmail'/>

          </div>
        </div>
        {/* WEBCAM COMPONENT  */}
        {/* {showModal && (
          <div
            className="absolute h-full w-full flex flex-col justify-center items-center"
            onClick={toggleModal}
          >
            <div className="h-1/2 w-1/2 bg-red-300 flex flex-col justify-center items-center">
              <Webcam
                ref={webCamRef}
                audio={false}
                height={240}
                screenshotFormat="image/jpeg"
                width={240}
              ></Webcam>
              <button
                className="w-1/3 h-auto p-4 rounded-md bg-amber-600"
                onClick={captureWebcam}
              >
                Capture image
              </button>
            </div>
          </div>
        )}
        <img src={imageSrc} alt="Profile Picture" />
        <button
          className="h-auto w-1/3 p-2 rounded-lg bg-amber-600 "
          onClick={toggleModal}
        >
          Show Modal
        </button> */}
      </div>
      <button
        className="bg-amber-600 font-semibold rounded-lg px-12 py-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div
        className="fixed bottom-4 right-4 bg-amber-600 p-4 hover:bg-black text-white rounded-full"
        onClick={addForm}
      >
        <img src={addSVG} width={50} alt={"add-image"}></img>
      </div>
    </div>
  );
};

export default Mainform;
