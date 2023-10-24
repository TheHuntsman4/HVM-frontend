import bg from '../assets/back.png'
import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export default function Page(props) {

  const [data, setData] = useState({}); // State to store the response data
  const [formData, setFormData] = useState({
    uname:'',
    pass: '',
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
        <div className='flex bg-white/30 h-[30rem] w-[45rem] rounded-3xl shadow-xl backdrop-blur-sm px-32'>
          <form onSubmit={postData} className='flex flex-col w-full justify-center items-center'>
            <div className='flex flex-col gap-11 w-full mb-10 justify-center items-center'> 
              <input name="uname" className='h-16 text-2xl w-full p-5' placeholder='Username'onChange={handleInputChange}></input>
              <input name="pass" className='h-16 text-2xl w-full p-5' placeholder='Password' type='password'onChange={handleInputChange}></input>
            </div>
            <button className='bg-[#f58220] w-40 text-white h-16 rounded-3xl font-bold text-xl'>LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  )
}
