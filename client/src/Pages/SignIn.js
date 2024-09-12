import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import { useRecoilState } from 'recoil'
import { userDataState, isLoggedInState } from '../state';
import axios from 'axios';

const SignIn = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

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

  const handleLoginClick = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      console.log(baseUrl);
      const response = await axios.post(`${baseUrl}api/v1/user/signin`, userData);
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        const { token, userDetails } = response.data;
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        setUserData(userDetails);
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='text-black h-[100vh] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500'>
        <div className='bg-blue-200 border border-blue-600 rounded-md p-8 mt-28 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-40 relative'>
          <h1 className='text-4xl text-white font-bold text-center mb-6'>Login</h1>

          <div className='relative my-7'>
            <input
              type='text'
              name='userId'
              value={userData.userId}
              onChange={handleInputChange}
              placeholder='Your User ID...'
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <BiUser className='absolute top-3 right-0 text-white text-2xl' />
          </div>

          <div className='relative my-7'>
            <input
              type='password'
              name='password'
              value={userData.password}
              onChange={handleInputChange}
              placeholder='Your Password...'
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer placeholder:italic placeholder:text-white'
            />
            <AiOutlineLock className='absolute top-3 right-0 text-white text-2xl' />
          </div>

          <div className='flex justify-between items-center text-white'>
            <div className='flex mt-4'>
              <input type='checkbox' className='mt-0.5 mr-2' name='' id='' />
              <label htmlFor='Remember Me' className='text-sm'>Remember Me</label>
            </div>
            <span className='text-white text-sm cursor-pointer mt-3'>Forgot Password?</span>
          </div>

          <button
            onClick={handleLoginClick}
            className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-blue-400 hover:bg-blue-200 hover:text-black py-2 transition-colors duration-300'
          >
            Login
          </button>

          <div className='text-center mt-5'>
            <span className='m-4 text-white'>
              New Here? <Link to='/register' className='text-blue-800'>Create an Account</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
