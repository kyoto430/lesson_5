import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {!Array.isArray(qualities) &&
                Object.keys(qualities).map((quality) => (
                    <Quality key={qualities[quality]._id} {...quality} />
                ))}
            {qualities.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
