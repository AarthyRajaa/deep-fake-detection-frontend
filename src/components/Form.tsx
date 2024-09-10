import React, { useState, useRef } from "react";
import axios from "axios";

const Form = () => {
  const [file, setFile] = useState<File | null>(null); // Store the file
  const [prediction, setPrediction] = useState<string | null>(null); // Store the prediction result
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Extract the prediction from the response
      const { prediction } = response.data;
      setPrediction(prediction); // Set the prediction result
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Failed to upload the image or receive prediction.");
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
