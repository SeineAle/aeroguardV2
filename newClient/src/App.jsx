import { useEffect } from 'react';
import './App.css';
import {DamageDetection, Home, MaintainanceLogs, Register, SignIn, StressPointsAnalysis} from './pages/index'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './state';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
      setUserData(false);
    }
  }, [setIsLoggedIn]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={isLoggedIn?<Home/>:<SignIn />} />
          <Route path='/register' element={isLoggedIn?<Home/>:<Register />} />
          <Route path='/stressPointAnalysis' element={!isLoggedIn?<SignIn/>:<StressPointsAnalysis />} />
          <Route path='/maintainanceLogs' element={!isLoggedIn?<SignIn/>:<MaintainanceLogs />} />
          <Route path='/damageDetection' element={!isLoggedIn?<SignIn/>:<DamageDetection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;