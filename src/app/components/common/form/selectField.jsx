/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    name,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((key) => ({
                  _id: options[key]._id,
                  name: options[key].name
              }))
            : options;

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                onChange={handleChange}
                value={value}
                className={`form-select${error ? " is-invalid" : ""}`}
                name={name}
                id="validationCustom04"
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    data: PropTypes.object,
    onChange: PropTypes.func,
    error: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
