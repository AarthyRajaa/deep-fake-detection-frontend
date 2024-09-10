import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card" style={{ border: "0px" }}>
        <div className="row">
          <div className="col p-5">
            <div className="card " style={{ border: "0px" }}>
              <div className="card-body">
                <h5 className="card-title fs-1">
                  Deep Fake Image <br />
                  Detection: GAN Model
                </h5>
                <p className="card-text">
                  Our GAN Model detects real or fake image <br />
                  with high accuracy.
                </p>
                <a
                  onClick={() => {
                    navigate("/predict");
                  }}
                  className="btn btn-dark me-3"
                >
                  Predict
                </a>

                <a className="btn btn-dark" href="#" role="button">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <img
              src="/cdpNetworkImage.png"
              className=" float-end"
              alt="Neuron image"
              style={{ height: "500px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
