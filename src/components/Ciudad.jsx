import React from "react";
import "../styles/ciudad.css";

export const Ciudad = ({ ciudad, coordenadas, ciudadInicio }) => {
  return (
    <div
      className="ciudad"
      style={{
        position: "absolute",
        left: `${coordenadas.x}px`,
        bottom: `${coordenadas.y}px`,
        backgroundColor: ciudad === ciudadInicio ? "#fff" : "#000",
        color: ciudad === ciudadInicio ? "#000" : "#fff",
      }}
    >
      <p>{ciudad}</p>
    </div>
  );
};
