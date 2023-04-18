export const MySelect = ({ titulo, data, handleOnChange, value, disabled }) => {
  return (
    <div className="card">
      <label htmlFor={titulo}>{titulo}</label>
      <select
        id={titulo}
        onChange={handleOnChange}
        value={value}
        disabled={disabled}
      >
        <option value={0}>Selecciona un aeropuerto</option>
        {data.map((el, index) => (
          <option key={el.ciudad + index + 1} value={index + 1}>
            {el.aeropuerto}
          </option>
        ))}
      </select>
    </div>
  );
};
