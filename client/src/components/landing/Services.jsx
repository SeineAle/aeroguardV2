import React from 'react';

import Airbus from '../../assets/clientLogoPNGs/Airbus.png'
import LMT from '../../assets/clientLogoPNGs/LMT.png';
import Boieng from '../../assets/clientLogoPNGs/Boeing.png';
import Bombardier from '../../assets/clientLogoPNGs/Bombardier.png';
import Embraer from '../../assets/clientLogoPNGs/Embraer.png'

const Services = () => {

  return (
    <div className='md:px-14 px-4 py-16 max-w-screen-2xl mx-auto' id='service'>
        <div className='text-center my-2'>
            <h2 className='text-4xl font-semibold mb-2'>Our Clients</h2>
            <p className='text-silver tracking-wide'>
                We have worked with a wide variety of clients, ranging from passanger to defense aircraft builders.
            </p>

            {/* company logos */}
            <div className='my-5 flex flex-wrap justify-between items-center gap-8'>
                <img src={Airbus} alt="Airbus Logo" className="w-32 h-32 transform transition-transform duration-300 hover:scale-125 cursor-pointer" onClick={()=>{ window.location.replace('https://www.airbus.com/en');}}/>
                <img src={Boieng} alt="Boieng Logo" className="w-40 h-40 transform transition-transform duration-300 hover:scale-125 cursor-pointer" onClick={()=>{ window.location.replace('https://www.boeing.co.in/');}}/>
                <img src={LMT} alt="LMT Logo" className="w-72 h-72 transform transition-transform duration-300 hover:scale-125 cursor-pointer" onClick={()=>{ window.location.replace('https://www.lockheedmartin.com/');}}/>
                <img src={Bombardier} alt="Bombardier Logo" className="w-32 h-32 transform transition-transform duration-300 hover:scale-125 cursor-pointer" onClick={()=>{ window.location.replace('https://bombardier.com/en');}}/>
                <img src={Embraer} alt="Embraer Logo" className="w-40 h-40 transform transition-transform duration-300 hover:scale-125 cursor-pointer" onClick={()=>{ window.location.replace('https://embraer.com/');}}/>
            </div>

            {/* service cards */}
            <div className='mt-10 mb-20 md:w-1/2 mx-auto text-center'>
                <h2 className='text-4xl text-black font-semibold mb-3'>Elevate your Flight Security with our cutting edge technology.</h2>
            </div>
        </div>
    </div>
  )
}

export default Services;


