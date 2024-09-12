import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userDataState } from '../state';
import { useEffect } from 'react';
import About from '../Components/About';
import GetStarted from '../Components/GetStarted';
import Testemonials from '../Components/Testemonials';
import Services from '../Components/Services';
import End from '../Components/End';
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userData, setUserData] = useRecoilState(userDataState)

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
      setUserData(false);
    }
  }, [setIsLoggedIn]);
  return (
    <div>
      <Header />
      <Hero />
      <GetStarted/>
      <Services/>
      <Testemonials/>
      <About/>
      <End/>
    </div>
  )
}

export default Home;