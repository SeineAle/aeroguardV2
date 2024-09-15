import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userDataState } from '../state';

import {About, GetStarted, Testemonials, Services, End, Header, Hero} from '../components/landing/index'
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
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