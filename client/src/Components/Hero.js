import React from 'react';
import { Carousel } from 'flowbite-react';
import heroImg01 from '../Assets/hero1.png';
import heroImg02 from '../Assets/hero2.png';
import heroImg03 from '../Assets/hero3.png';
import heroImg04 from '../Assets/hero4.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500" id='home'>
        
        <div className="h-screen min-h-screen px-4 mx-auto lg:px-14 max-w-screen-2xl">
            <Carousel className='w-full mx-auto'>

                <div className="flex flex-col items-center justify-between gap-12 py-12 my-28 md:my-8 md:flex-row-reverse">
                <div className="transform-gpu rotate-[0deg]">
                    <img src={heroImg01} alt=''/>
                </div>
                    {/* hero text */}
                    <div className='md:w-3/4'>
                    
                        <h1 className='mb-4 text-5xl font-semibold leading-snug text-black md:w-3/4'>Smart Detection, Swift Repair<span className='leading-snug text-blue-300'>–The Aeroguard Advantage.</span></h1>

                        <p className='mb-8 text-base tracking-wide text-white md:w-3/4'>Aeroguard harnesses cutting-edge AI technology to rapidly detect and repair aircraft damage, ensuring maximum safety and minimal downtime</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-10 py-12 my-28 md:my-8 md:flex-row-reverse">
                    <div className="w-96 h-96]">
                        <img src={heroImg02} alt='' className="object-cover w-full h-full"/>
                    </div>

                    {/* hero text */}
                    <div className='md:w-1/2'>

                        <h1 className='mb-4 text-5xl font-semibold leading-snug text-black md:w-3/4'>Spotting Damage with <span className='leading-snug text-blue-300'>Machine Learning</span>  Precision.</h1>

                        <p className='mb-8 text-base tracking-wide text-white'>Utilize ML-driven image analysis to detect aircraft damage with pinpoint accuracy. </p>

                        <button className='py-2 font-bold text-black transition-all duration-300 rounded px-7 bg-steelBlue hover:bg-silver hover:-translate-y-4' onClick={() => navigate("/signin")}><span className='hover:tracking-wide'>Get Started</span></button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-10 py-12 my-28 md:my-8 md:flex-row-reverse">
                <div className="w-96 h-96">
                    <img src={heroImg03} alt='' className="object-cover w-full h-full"/>
                </div>


                    {/* hero text */}
                    <div className='md:w-3/4'>

                        <h1 className='mb-4 text-5xl font-semibold leading-snug text-black md:w-3/4'>Comprehensive Damage Logging<span className='leading-snug text-blue-300'>-Track and Trace Every Detail.</span></h1>

                        <p className='mb-8 text-base tracking-wide text-white'>Maintain comprehensive logs of all aircraft damage and repairs for future reference.  </p>

                        <button className='py-2 font-bold text-black transition-all duration-300 rounded px-7 bg-steelBlue hover:bg-silver hover:-translate-y-4' onClick={() => navigate("/signin")}><span className='hover:tracking-wide'>Get Started</span></button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-10 py-12 my-28 md:my-8 md:flex-row-reverse">
                    <div className="w-96 h-96]">
                        <img src={heroImg04} alt='' className="object-cover w-full h-full"/>
                    </div>

                    {/* hero text */}
                    <div className='md:w-1/2'>

                        <h1 className='mb-4 text-5xl font-semibold leading-snug text-black md:w-3/4'>Better <span className='leading-snug text-blue-300'>Visualization</span> and <span className='leading-snug text-blue-300'>Analysis.</span></h1>

                        <p className='mb-8 text-base tracking-wide text-white'>Leverage 3D models to enhance understanding and optimize repair strategies.  </p>

                        <button className='py-2 font-bold text-black transition-all duration-300 rounded px-7 bg-steelBlue hover:bg-silver hover:-translate-y-4' onClick={() => navigate("/signin")}><span className='hover:tracking-wide'>Get Started</span></button>
                    </div>
                </div>

            </Carousel>
        </div>
    
  </div>
  )
}

export default Hero;