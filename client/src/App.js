import './App.css';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import StressPointsAnalysis from './Pages/StressPointsAnalysis';
import MaintainanceLogs from './Pages/MaintainanceLogs';
import DamageDetection from './Pages/DamageDetection';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

    return (
    <div>
      
      <BrowserRouter>

          <Routes>
      
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/stressPointAnalysis' element={<StressPointsAnalysis/>}/>
            <Route path='/maintainanceLogs' element={<MaintainanceLogs/>}/>
            <Route path='/damageDetection' element={<DamageDetection/>}/>

          </Routes>

      </BrowserRouter>
      

    </div>
  );
}

export default App;
