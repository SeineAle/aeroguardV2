import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../state'; 
import { useNavigate } from 'react-router-dom';
import {Header, End} from '../components/landing/index'
import {ImageUpload} from '../components/DamageDetection/index';

const DamageDetection = () => {
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
    <Header />
    <ImageUpload/>
    <End/>
    </>
  );
};

export default DamageDetection;
