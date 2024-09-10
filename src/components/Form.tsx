import React, { useState, useRef } from "react";
import axios from "axios";
import client from "../../client";

const Form = () => {
  const [file, setFile] = useState<File | null>(null); // Store the file
  const [prediction, setPrediction] = useState<string | null>(null); // Store the prediction result
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setImageUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Set the file
      setPrediction(null);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the hidden file input click
    }
  };

  const handlePrediction = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      // Upload file to Sanity CDN
      const sanityResponse = await client.assets.upload("image", file);

      // Get the uploaded file's URL from Sanity
      const sanityImageUrl = sanityResponse.url;
      setImageUrl(sanityImageUrl); // Set the Sanity image URL to state

      // Send the Sanity image URL to FastAPI backend for prediction
      const response = await axios.post(
        "https://deep-fake-detection-backend.onrender.com/predict/",
        {
          imageUrl: sanityImageUrl,
        }
      );

      // Extract the prediction result from the backend response
      const { prediction } = response.data;
      setPrediction(prediction); // Set the prediction result to state
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Failed to predict.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col pt-5">
            <form>
              <p className="fs-4">Select Image to Predict</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                style={{ display: "none" }}
              />

              <button
                type="button"
                onClick={handleButtonClick}
                className="btn btn-dark mt-3 me-3"
              >
                Select File
              </button>

              <button
                type="button"
                onClick={handlePrediction}
                className="btn btn-dark mt-3"
              >
                Predict
              </button>
            </form>
          </div>

          <div className="col">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded Preview"
                style={{ width: "500px", height: "500px", marginTop: "20px" }}
              />
            )}

            {/* Display prediction result */}
            {prediction && (
              <div className="mt-4">
                <p className="fs-3">Prediction : {prediction}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
