import React, { useState } from "react"
import bg from '../assets/back.png'
import axios from 'axios';

export default function Page(props) {

  const [data, setData] = useState({}); // State to store the response data
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    uname:'',
    pass: '',
    conPass: '',
    email: '',
    conNum: '',
    empid: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };

  const postData = async () => {
    try {
      const response = await axios.post('https:', {
        formData
      });

      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-back-login h-[100vh]' style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex items-center justify-center h-full w-full bg-no-repeat bg-cover bg-center">
        <div className='flex bg-white/30 h-[40rem] w-[50rem] rounded-3xl shadow-xl backdrop-blur-sm px-5'>
          <form onSubmit={postData} className='flex flex-col w-full justify-center items-center'>
            <div className='flex flex-row gap-11 w-full mb-3 justify-center items-center'>
              <div className="flex flex-col gap-11">
                <input name="fname" className='h-16 text-2xl w-full p-5' placeholder='First Name' onChange={handleInputChange}></input>
                <input name="lname" className='h-16 text-2xl w-full p-5' placeholder='Last Name' onChange={handleInputChange}></input>
                <input name="uname" className='h-16 text-2xl w-full p-5' placeholder='Usernme' onChange={handleInputChange}></input>
                <input name="pass" className='h-16 text-2xl w-full p-5' placeholder='Password' type='password' onChange={handleInputChange}></input>
                <input name="conPass" className='h-16 text-2xl w-full p-5' placeholder='Confirm Password' type='password' onChange={handleInputChange}></input>
              </div>
              <div className="flex flex-col gap-11">
                <input name="email" className='h-16 text-2xl w-full p-5' placeholder='Email' onChange={handleInputChange}></input>
                <input name="conNum" className='h-16 text-2xl w-full p-5' placeholder='Contact_Number' onChange={handleInputChange}></input>
                <input name="empid" className='h-16 text-2xl w-full p-5' placeholder='Employee_Id' onChange={handleInputChange}></input>
              </div>
            </div>
            <button className='bg-[#f58220] w-40 text-white h-16 rounded-3xl font-bold text-xl'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}
