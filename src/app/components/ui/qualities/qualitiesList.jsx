import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities: qualitiesArray }) => {
    const { qualities } = useQualities();
    const qual = qualities.filter((q) => qualitiesArray.includes(q._id));
    return (
        <>
            {qual.map((quality, index) => {
                return <Quality key={index} {...quality} />;
            })}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
