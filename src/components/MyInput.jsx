import React from "react";

export const MyInput = ({
  titulo,
  type,
  placeholder,
  handleOnChange,
  value,
  step = 1,
}) => {
  return (
    <div className="card">
      <label htmlFor={titulo}>{titulo}</label>
      <input
        type={type}
        id={titulo}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        step={step}
      />
    </div>
  );
};
