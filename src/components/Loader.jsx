import React from "react";
import "../styles/loader.css";

export const Loader = ({ porcentaje }) => {
  return (
    <div className="loader">
      <p className="porcentaje">{porcentaje}%</p>
      <div className="loader-animation"></div>
    </div>
  );
};
