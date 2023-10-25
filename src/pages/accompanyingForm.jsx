import React, { useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import placeHolder from "../assets/placeholder.jpeg";
import addSVG from "../assets/add.svg";
import closeSVG from "../assets/close.svg";
import cameraSVG from "../assets/camera.svg";

function AccompanyingForm() {
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();
  const navigate = useNavigate()
  const leadID = location.state.uuid;
  console.log(leadID);
  const [formFields, setFormFields] = useState([
    {
      full_name: "",
      email: "",
      contact_number: "",
      image: "",
      showModal: false,
      lead_visitor_id: leadID,
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
      data[index].image = imageSrc;
      setFormFields(data);
    },
    [formFields]
  );

  const [showConfirmationModal, setshowConfirmationModal] = useState(false);
  const toggleConfirmation = () => {
    setshowConfirmationModal(!showConfirmationModal);
  };

  const cleanData = () => {
    const cleanData = formFields.map((form, index) => {
      if (index === 0) {
        const { showModal, ...rest } = form;
        return rest;
      }
      return form;
    });
    return cleanData;
  };

  const onSubmit = async () => {
    const requestData = cleanData();
    try {
      const url = "https://aims.pythonanywhere.com/api/accompanying/";
      const token = accessToken;

      const response = await axios.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const uniqueId = leadID
      navigate("/print", { state: { uuid: uniqueId } });
    } catch (error) {
      console.error(error);
    }
  };

  const addFields = () => {
    let object = {
      full_name: "",
      email: "",
      contact_number: "",
      image: "",
      lead_visitor_id: leadID,
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
      {showConfirmationModal && (
        <div className="fixed w-full h-full top-0 bottom-0 flex flex-col justify-center items-center" onClick={toggleConfirmation}>
          <div className="bg-black opacity-75 absolute inset-0"></div>
          <div className="bg-white h-1/2 w-1/2 relative flex flex-col justify-center items-center">
            <p>Are you sure all of the entered data is correct?</p>
            <p className="text-red-900 font-semibold">
              WARNING THE FORM WILL BE RESET AFTER CLICKING THE BUTTON BELOW
            </p>
            <button
              type="submit"
              onClick={onSubmit}
              className="px-6 py-4 bg-amritaOrange text-center"
            >
              Continue To Print
            </button>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="h-full w-full mt-24">
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
                        name="full_name"
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
                        name="contact_number"
                        type="number"
                        placeholder="Phone Number"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.phonenumber}
                      />
                    </div>
                    <div className="w-1/2">
                      {form.image ? (
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={form.image}
                            width={360}
                            alt="Profile Picture"
                          />
                          <button
                          type="button"
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
                            type="button"
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
          onClick={toggleConfirmation}
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
