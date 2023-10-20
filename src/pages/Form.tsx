import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { FormComponent } from "../components";
import addSVG from "../assets/add.svg";
export const Mainform = () => {

  // form hook definitions
  const leadForm = useForm<FormValues>();
  const { register, control, handleSubmit } = leadForm
  type FormValues = {
    leadFullName: string;
    leadEmail: string;
    companyName: string;
    leadPhoneNumber: number;
    leadImage: string;
    leadAddress1: string;
    leadAddress2: string;
  };

  const [formComponents, setFormComponents] = useState([])

  const onSubmit = (data: FormValues) => {
    console.log('form submitted', data)
  };
  const addForm = () => {
    console.log('adding form')
  };

  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('0');

  const webCamRef = useRef(null);


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const captureWebcam = () => {
    setImageSrc(webCamRef.current.getScreenshot());
    leadForm.setValue('leadImage', imageSrc)
  };
  return (
    <div className="h-screen w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full flex flex-col items-center mt-24">
        <div className="p-6 w-2/3 bg-[#E9EDFF]">
          <div className="h-1/2 p-12 grid grid-cols-1 w-1/2">
            <label className="font-semibold text-md">Full Name</label>
            <input type="text" id="leadFullName"  {...register('leadFullName')} className="h-10 px-2" />
            <label className="font-semibold text-md pt-6 pb-2">Company Name</label>
            <input type="text" id='companyName' {...register('companyName')} className=" h-10 px-2" />
            <label className="font-semibold text-md pt-6 pb-2">Phone Number</label>
            <input type="number" id='leadPhoneNumber' {...register('leadPhoneNumber')} className=" h-10 px-2" />
            <label className="font-semibold text-md pt-6 pb-2">Email</label>
            <input type="email" id='leadEmail' {...register('leadEmail')} className=" h-10 px-2" />
            <input type="hidden" {...register('leadImage')} />
          </div>
        </div>
        <span>File Upload</span>
        <div className="mt-6 p-6 w-2/3 bg-[#E9EDFF]">
          <div className="h-1/2 p-12 grid grid-cols-1 w-1/2">
            <label className="font-semibold text-md">Full Name</label>
            <input type="text" id="leadFullName"  {...register('leadFullName')} className="h-10 px-2" />
            <label className="font-semibold text-md pt-6 pb-2">Company Name</label>
            <input type="text" id='companyName' {...register('companyName')} className=" h-10 px-2" />
            <label className="font-semibold text-md pt-6 pb-2">Phone Number</label>
            <input type="number" id='leadPhoneNumber' {...register('leadPhoneNumber')} className=" h-10 px-2" />
            <label className="font-semibold text-md pt-6 pb-2">Email</label>
            <input type="email" id='leadEmail' {...register('leadEmail')} className=" h-10 px-2" />
            <input type="hidden" {...register('leadImage')} />
          </div>
        </div>







{/* Addresss stuff */}
        <span className="">
            <label className="font-semibold text-md pt-6 pb-2">Address Line 1</label>
            <input type="leadAddress1" id='leadAddress1' {...register('leadAddress1')} className=" h-10 px-2" />
            <label className="font-semibold text-md pt-6 pb-2">Address Line 2</label>
            <input type="leadAddress2" id='leadAddress2' {...register('leadAddress2')} className=" h-10 px-2" />
          </span>
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

        <button
          className="bg-amber-600 font-semibold rounded-lg px-12 py-4"
        >
          Submit
        </button>
      </form>
      <div
        className="fixed bottom-4 right-4 bg-amber-600 p-4 hover:bg-black text-white rounded-full"
        onClick={addForm}
      >
        <img src={addSVG} width={50} alt={"add-image"}></img>
      </div>
      <DevTool control={control} />
    </div>

  );
};

