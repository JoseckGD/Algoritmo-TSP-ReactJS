import React from "react";
import "../styles/ciudad.css";
import { Tooltip } from "react-tooltip";

export const Ciudad = ({
  numero,
  ciudad,
  aeropuerto,
  coordenadas,
  ciudadInicio,
}) => {
  return (
    <>
      <div
        className="ciudad"
        style={{
          position: "absolute",
          left: `${coordenadas.x}px`,
          bottom: `${coordenadas.y}px`,
          backgroundColor: numero === ciudadInicio ? "#fff" : "#000",
          color: numero === ciudadInicio ? "#000" : "#fff",
        }}
        data-tooltip-id={`ciudad-tooltip-${ciudad}`}
        data-tooltip-content={aeropuerto}
      >
        <p>{ciudad}</p>
      </div>
      <Tooltip
        id={`ciudad-tooltip-${ciudad}`}
        style={{ width: "5.2rem", wordBreak: "break-word" }}
      />
    </>
  );
};
