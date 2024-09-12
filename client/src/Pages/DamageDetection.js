import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../state'; 
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import axios from 'axios';

const DamageDetection = () => {
  const [isLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);           // Image selected by the user
  const [previewUrl, setPreviewUrl] = useState(null); // URL for the image preview
  const [resultImage, setResultImage] = useState(null); // URL for the result image from backend
  const [loading, setLoading] = useState(false);       // Loading state

  // Check if the user is logged in, redirect to signin if not
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin'); 
    }
  }, [isLoggedIn, navigate]);

  window.location.replace('https://huggingface.co/spaces/bishalrauniyar/Yolov8based-ImageAircraftdamagedetection')
  // Handle image selection
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreviewUrl(URL.createObjectURL(file)); // Set preview image URL
  //   }
  // };

  // // Handle form submission to send image to API
  // const handleSubmit = async () => {
  //   if (!image) {
  //     alert("Please upload an image first");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('image', image);

  //   try {
  //     setLoading(true);
  //     const response = await axios.post('http://your-backend-api-url.com/predict', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     const imageUrl = response.data[0].url;
  //     if (imageUrl) {
  //       setResultImage(imageUrl);
  //     } else {
  //       alert("No image returned from the API");
  //     }
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {/* <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Aircraft Damage Detection</h2> */}

        {/* Image Upload Input */}
        {/* <div className="mb-6">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-500 file:text-white
                       hover:file:bg-blue-600
                       focus:outline-none"
          />
        </div> */}

        {/* Image Preview */}
        {/* {previewUrl && (
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-2">Uploaded Image:</h3>
            <img src={previewUrl} alt="Uploaded Preview" className="w-64 h-64 object-cover border border-gray-300 rounded-lg shadow-lg" />
          </div>
        )} */}

        {/* Submit Button */}
        {/* <button 
          onClick={handleSubmit} 
          disabled={loading}
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg 
                      font-medium transition-colors ${loading ? 'bg-gray-400' : 'hover:bg-blue-600'}`}
        >
          {loading ? "Processing..." : "Upload and Analyze"}
        </button> */}

        {/* Result Image */}
        {/* {resultImage && (
          <div className="mt-10">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Result Image:</h3>
            <img src={resultImage} alt="Processed Result" className="max-w-full border border-gray-300 shadow-lg rounded-lg" />
          </div>
        )} */}
      {/* </div> */}
    </>
  );
};

export default DamageDetection;
