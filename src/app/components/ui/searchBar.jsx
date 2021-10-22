import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ search, onItemSearch }) => {
    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Поиск</span>
                </div>
                <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={onItemSearch}
                    className="form-control"
                    placeholder="Search..."
                />
            </div>
        </>
    );
};

SearchBar.propTypes = {
    search: PropTypes.string,
    onItemSearch: PropTypes.func
};

export default SearchBar;
