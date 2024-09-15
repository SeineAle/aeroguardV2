import React, {useEffect} from 'react'
import {Header} from '../components/landing/index'
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../state'; 
import { useNavigate } from 'react-router-dom';
export const MaintainanceLogs = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

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
    if (!isLoggedIn) {
      navigate('/signin'); 
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <Header/>
      <div>maintainanceLogs</div>
    </>
  )
}

export default MaintainanceLogs;
