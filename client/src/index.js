import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import ImageUpload from './ImageUpload';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      {/* <ImageUpload/> */}
    </RecoilRoot>
  </React.StrictMode>
);



