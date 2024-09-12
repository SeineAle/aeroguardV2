import './App.css';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import StressPointsAnalysis from './Pages/StressPointsAnalysis';
import MaintainanceLogs from './Pages/MaintainanceLogs';
import DamageDetection from './Pages/DamageDetection';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './state';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

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
