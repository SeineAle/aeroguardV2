import React, {useEffect} from 'react'
import Header from '../Components/Header'
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../state'; 
import { useNavigate } from 'react-router-dom';
export const MaintainanceLogs = () => {
  const [isLoggedIn] = useRecoilState(isLoggedInState);
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
