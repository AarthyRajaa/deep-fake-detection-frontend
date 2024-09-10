import React from "react";
import { useNavigate } from "react-router-dom";
import { MdBatchPrediction } from "react-icons/md";

const NavBar = () => {
  const navigate = useNavigate();

  const navList = ["Predict", "About", "Contact"];
  const navListItems = navList.map((item, index) => (
    <li
      key={index}
      className="nav-item mt-2 mb-2 ms-4 me-4"
      onClick={() => handleMultipleClick(index)}
    >
      {item}
    </li>
  ));

  const handelClick = () => {
    navigate("/");
  };

  const handleMultipleClick = (index) => {
    if (index == 0) navigate("/predict");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-expand-sm bg-body fs-5"
        style={{ border: "0px" }}
      >
        <div
          className="container-fluid"
          style={{ backgroundColor: "white", margin: "0px" }}
        >
          <MdBatchPrediction
            className="navbar-brand"
            size={34}
            onClick={handelClick}
          />
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
              {navListItems}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
