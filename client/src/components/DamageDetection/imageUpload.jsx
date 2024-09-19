import React, { useState, useRef } from "react";
import { Client } from "@gradio/client";

const ImageUpload = () => {
  console.log("hi");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setImageURL(URL.createObjectURL(file));
        setError(null);
      } else {
        setError("Please upload a valid image file.");
        setSelectedImage(null);
      }
    }
  };

  const handlePrediction = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setPredictionResult(null);

    try {
      const imageBlob = new Blob([selectedImage], { type: selectedImage.type });

      const client = await Client.connect("bishalrauniyar/Yolov8based-ImageAircraftdamagedetection");

      const result = await client.predict("/predict", {
        image: imageBlob,
        image_size: 640,
        conf_threshold: 0.25,
        iou_threshold: 0.45,
      });

      setPredictionResult(result.data);
    } catch (error) {
      console.error("Error during prediction:", error);
      setError("Failed to get prediction. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center md:mt-28 py-6">
      <div className="heading text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Upload Image for Aircraft Damage Detection</h2>
      </div>

      <div className="main-window gap-x-10  bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex justify-between">
        <div className="image-input w-1/2 flex flex-col items-center border-2 border-gray-200 rounded-lg p-4 relative">
        <h3 className="text-lg font-medium text-gray-700">Input Image:</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="relative w-full h-72 flex justify-center items-center bg-gray-100 rounded-lg" onClick={()=>{fileInputRef.current.click();}}>
            {!imageURL && (
              <div className="text-gray-400 flex flex-col justify-center items-center">
               <svg width="150px" height="150px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M18 8V3M18 3L16 5M18 3L20 5" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
              </svg>

                <p className="mt-2 text-sm">click here or drag and drop</p>
              </div>
            )}
            {imageURL && (
              <div >
                <img src={imageURL} alt="Input" className="mt-2 w-72 h-auto rounded-lg border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>

          <button
            onClick={handlePrediction}
            disabled={loading}
            className={`mt-6 py-2 px-4 font-bold
              ${loading || !imageURL ? "bg-gray-200 cursor-not-allowed" : " text-white transition-all duration-300 rounded bg-blue-700 hover:bg-gray-400 hover:text-black hover:-translate-y-4"}`}
          >
            {loading ? "Detecting For Damages" : "Detect Aircraft Damage"}
          </button>
        </div>

        <div className="image-output w-1/2 flex flex-col items-center border-2 border-gray-200 rounded-lg p-4 relative">
          <h3 className="text-lg font-medium text-gray-700">Output Image:</h3>

          <div className="relative w-full h-72 flex justify-center items-center bg-gray-100 rounded-lg">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}

            {!loading && predictionResult && (
              <img
                src={predictionResult[0].url}
                alt="Prediction Output"
                className="mt-2 w-72 h-auto rounded-lg border border-gray-200 shadow-sm"
              />
            )}

            {!loading && !predictionResult && (
              <div className="text-gray-400 flex flex-col justify-center items-center">
                <svg width="155px" height="155px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M12 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M4.04193 18.2622C4.07264 18.5226 4.12583 18.7271 4.21799 18.908C4.40973 19.2843 4.7157 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12M16 3L18.5 5.5M18.5 5.5L21 8M18.5 5.5L21 3M18.5 5.5L16 8" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
                </svg>

                <p className="mt-2 text-sm">No image uploaded</p>
              </div>
            )}
          </div>
          
          

          {(predictionResult && !loading)? (
            <a href={predictionResult[0].url} download="output_image.webp">
              <button
                onClick={handlePrediction}
                className={"mt-6 py-2 px-4 font-bold text-white transition-all duration-300 rounded bg-blue-700 hover:bg-gray-400 hover:text-black hover:-translate-y-4"}
              >
                Download Output Image
              </button>
            </a>
          ) : (
            <button
                disabled={true}
                className={"mt-6 py-2 px-4 font-bold bg-gray-200 cursor-not-allowed"}
              >
                Download Output Image
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
