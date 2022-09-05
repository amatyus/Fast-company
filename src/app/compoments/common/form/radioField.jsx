import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map((opstion) => (
          <div
            key={opstion.name + "_" + opstion.value}
            className="form-check form-check-inline"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={opstion.name + "_" + opstion.value}
              checked={opstion.value === value}
              value={opstion.value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={opstion.name + "_" + opstion.value}
            >
              {opstion.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default RadioField;
