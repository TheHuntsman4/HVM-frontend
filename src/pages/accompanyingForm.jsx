import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import placeHolder from "../assets/placeholder.jpeg";
import addSVG from "../assets/add.svg";
import closeSVG from '../assets/close.svg';
import cameraSVG from "../assets/camera.svg";

function AccompanyingForm() {
  const leadID = "somevalue";
  const [formFields, setFormFields] = useState([
    {
      lead_visitor_id: leadID,
      fullname: "",
      email: "",
      phonenumber: "",
      imageSrc: "",
      showModal: false,
    },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const toggleModal = (index) => {
    let data = [...formFields];
    data[index].showModal = !data[index].showModal;
    setFormFields(data);
  };

  const webcamRef = useRef(0);

  const capture = useCallback(
    (index) => {
      const imageSrc = webcamRef.current.getScreenshot();
      let data = [...formFields];
      data[index].imageSrc = imageSrc;
      setFormFields(data);
    },
    [formFields]
  );

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  const addFields = () => {
    let object = {
      fullname: "",
      email: "",
      phonenumber: "",
      imageSrc: "",
      address1: "",
      address2: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  return (
    <div className="h-full w-full">
      <form onSubmit={submit} className="h-full w-full mt-24">
        <div>
          {formFields.map((form, index) => {
            return (
              <div key={index}>
                <div className="p-6 w-full flex flex-col items-center">
                  <div className="h-1/2 w-1/2 p-12 flex justify-between items-start bg-[#E9EDFF] rounded-md">
                    <div className="flex flex-col w-1/2">
                      <label className="font-semibold text-md">Full Name</label>
                      <input
                        className="h-10 px-2"
                        name="fullname"
                        placeholder="Full Name"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.fullname}
                      />
                      <label className="font-semibold text-md pt-6 pb-2">
                        Email
                      </label>
                      <input
                        className="h-10 px-2"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.email}
                      />
                      <label className="font-semibold text-md pt-6 pb-2">
                        Phone Number
                      </label>
                      <input
                        className="h-10 px-2"
                        name="phonenumber"
                        type="number"
                        placeholder="Phone Number"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.phonenumber}
                      />
                    </div>
                    <div className="w-1/2">
                      {form.imageSrc ? (
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={form.imageSrc}
                            width={360}
                            alt="Profile Picture"
                          />
                          <button
                            className="h-auto w-1/2 mt-4 p-2 rounded-lg bg-amber-600 "
                            onClick={() => toggleModal(index)}
                          >
                            Take Picture Again
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex flex-col justify-center items-center">
                            <img
                              src={placeHolder}
                              width={240}
                              alt="Profile Picture"
                            />
                            <button
                              className="h-auto w-1/2 mt-4 p-2 rounded-lg bg-amber-600 "
                              onClick={() => toggleModal(index)}
                            >
                              Take Picture
                            </button>
                          </div>
                          {form.showModal && (
                            <div
                              className="absolute top-0 left-0 h-screen w-full flex flex-col justify-center items-center bg-opacity-75 bg-black"
                              onClick={() => toggleModal(index)}
                            >
                              <div className="h-auto flex flex-col justify-center items-center w-1/3 bg-slate-600 rounded-md p-4">
                                <Webcam
                                  ref={webcamRef}
                                  audio={false}
                                  className="w-full h-full"
                                  screenshotFormat="image/jpeg"
                                ></Webcam>
                                <button
                                  className=" w-1/3 flex justify-evenly items-center py-4 px-2 mt-4 rounded-lg bg-amber-600"
                                  onClick={() => capture(index)}
                                >
                                  <img
                                    src={cameraSVG}
                                    width={40}
                                    className=""
                                  ></img>
                                  Capture image
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <button className="" onClick={() => removeFields(index)}>
                      <img src={closeSVG} width={30} />
                    </button> 
                  </div>
                  {/* <label className="font-semibold text-md pt-6 pb-2">
                    Address Line 1
                  </label>
                  <input
className="h-10 px-2"
                    name="address1"
                    placeholder="Address Line 1"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.address1}
                  />
                  <label className="font-semibold text-md pt-6 pb-2">
                    Address Line 2
                  </label>
                  <input
className="h-10 px-2"
                    name="address2"
                    placeholder="Address Line 2"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.address2}
                  /> */}
                </div>
              </div>
            );
          })}
        </div>
      </form>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <button
          className="px-6 py-4 bg-amber-600 font-semibold text-md rounded-lg"
          onClick={submit}
        >
          Submit
        </button>
      </div>
      <button
        className="fixed bottom-4 right-4 p-4 rounded-full hover-color-change bg-amber-600 hover:bg-black transition-colors duration-300"
        onClick={addFields}
      >
        <img src={addSVG} width={50} />
      </button>
    </div>
  );
}

export default AccompanyingForm;
