import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

function FormStuff() {
  const [formFields, setFormFields] = useState([
    {
      fullname: "",
      email: "",
      phonenumber: "",
      imageSrc: "",
      address1: "",
      address2: "",
    },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
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
    <div className="App">
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                name="fullname"
                placeholder="Full Name"
                onChange={(event) => handleFormChange(event, index)}
                value={form.fullname}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={(event) => handleFormChange(event, index)}
                value={form.email}
              />
              <input
                name="phonenumber"
                type="number"
                placeholder="Phone Number"
                onChange={(event) => handleFormChange(event, index)}
                value={form.phonenumber}
              />
              {form.imageSrc ? (
                <img src={form.imageSrc} alt="Preview" />
              ) : (
                <div>
                  <img src="placeholder.jpg" alt="Placeholder" />
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    // className="w-full h-full"
                    height={240}
                    width={240}
                    screenshotFormat="image/jpeg"
                  ></Webcam>
                  <button onClick={() => capture(index)}>Capture Image</button>
                </div>
              )}
              <input
                name="address1"
                placeholder="Address Line 1"
                onChange={(event) => handleFormChange(event, index)}
                value={form.address1}
              />
              <input
                name="address2"
                placeholder="Address Line 2"
                onChange={(event) => handleFormChange(event, index)}
                value={form.address2}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
      <button onClick={addFields}>Add More..</button>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default FormStuff;
