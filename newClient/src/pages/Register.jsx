import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/landing/index';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { userDataState, isLoggedInState } from '../state';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); 
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterClick = async () => {
    setLoading(true); // Start loading spinner
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${baseUrl}api/v1/user/signup`, userData);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <>
      <Header />
      <div className='text-black h-[100vh] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500'>
        <div className='bg-blue-200 border border-blue-600 rounded-md p-8 mt-28 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-40 relative'>
          <h1 className='text-4xl text-white font-bold text-center mb-6'>Register</h1>

          <div className='relative my-7'>
            <input
              type='text'
              name='userId'
              value={userData.userId}
              onChange={handleInputChange}
              placeholder='User ID...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <BiUser className='absolute top-3 right-2 text-white text-2xl' />
          </div>

          <div className='relative my-7'>
            <input
              type='text'
              name='firstName'
              value={userData.firstName}
              onChange={handleInputChange}
              placeholder='First Name...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
          </div>

          <div className='relative my-7'>
            <input
              type='text'
              name='lastName'
              value={userData.lastName}
              onChange={handleInputChange}
              placeholder='Last Name...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
          </div>

          <div className='relative my-7'>
            <input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              placeholder='Email...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
          </div>

          <div className='relative my-7'>
            <input
              type='password'
              name='password'
              value={userData.password}
              onChange={handleInputChange}
              placeholder='Password...'
              className='block w-80 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <AiOutlineLock className='absolute top-3 right-2 text-white text-2xl' />
          </div>

          {/* Display the spinner if loading, otherwise show the register button */}
          {loading ? (
            <div className='flex justify-center mt-6'>
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <button
              onClick={handleRegisterClick}
              className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-400 hover:bg-blue-200 hover:text-black py-2 transition-colors duration-300'
            >
              Register
            </button>
          )}

          <div className='text-center mt-5'>
            <span className='m-4 text-white'>
              Already have an account?{' '}
              <Link to='/signin' className='text-blue-800'>
                Login Here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
