import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import API from "../../../api";
import Qualities from "../../ui/qualities/index";
import Loader from "../../common/loader";

const UserPage = ({ id }) => {
    console.log("ID", id);
    const history = useHistory();
    const [userById, setUserById] = useState({});
    console.log("userById", userById);
    useEffect(() => {
        API.users.getById(id).then((user) => {
            setUserById(user);
        });
    }, []);
    const handleAllUsers = () => {
        history.push("/users");
    };
    if (!userById?.name) {
        return <Loader />;
    }
    return (
        <div className="container">
            <h1>{`Имя: ${userById.name}`}</h1>
            <h2>{`Профессия: ${userById.profession.name}`}</h2>
            {userById.qualities.map((quality) => (
                <Qualities key={quality._id} {...quality} />
            ))}
            <h6>{`completedMeetings: ${userById.completedMeetings}`}</h6>
            <h2>{`Rate: ${userById.rate}`}</h2>
            <button
                onClick={() => {
                    handleAllUsers();
                }}
            >
                Все пользователи
            </button>
        </div>
    );
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
