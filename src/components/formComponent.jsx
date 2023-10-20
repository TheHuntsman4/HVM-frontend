import Webcam from "react-webcam";
import React, { useState, useRef } from "react";

const FormComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(0);
  const [fullName, setFullName] = useState('');

  const webCamRef = useRef(null);

  const handleNameChange = (event) => {
    setFullName(event.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const captureWebcam = () => {
    setImageSrc(webCamRef.current.getScreenshot());
    console.log(imageSrc);
  };

  return (
    <div className="h-screen w-full">
      <div className="h-auto p-6 w-1/2 bg-[#E9EDFF]">
        <div className="flex flex-col"></div>
        <label>Full Name</label>
        <input type="text" value={fullName} onChange={handleNameChange} />

      </div>
      {/* WEBCAM COMPONENT  */}
      {showModal && (
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
      </button>
    </div>
  );
};

export default FormComponent;
