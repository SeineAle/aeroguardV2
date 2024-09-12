import React, {useEffect}from 'react'
import Header from '../Components/Header'
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../state'; 
import { useNavigate } from 'react-router-dom';
import ModelViewer from '../Components/StressPoints';
import End from '../Components/End'


const StressPointsAnalysis = () => {
  const [isLoggedIn] = useRecoilState(isLoggedInState);
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
