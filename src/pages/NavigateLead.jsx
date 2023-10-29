import React from 'react'
import { useLocation,useNavigate } from 'react-router'
import printerSVG from '../assets/printer.svg';
import peopleSVG from '../assets/associates.svg'
import bg from "../assets/back.png";

const NavigateLead = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const uuid = location.state?.uuid
  return (
    <div className="h-screen w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className='z-10 h-full w-full flex flex-col justify-center items-center'>
        <div className=''>
            Hello There {uuid}
        </div>
      </div>
    </div>
  )
}

export default NavigateLead
