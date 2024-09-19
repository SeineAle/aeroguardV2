import React, {useEffect}from 'react'
import {Header, End} from '../components/landing/index'
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../state'; 
import { useNavigate } from 'react-router-dom';
// import ModelViewer from './StressPoints';


const StressPointsAnalysis = () => {
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

  window.location.replace('https://airplane-stresspoint-analysis.netlify.app/')
  return (
    <>
        {/* <Header/>
        <ModelViewer/>
        <End/> */}
    </>
  )
}

export default StressPointsAnalysis
