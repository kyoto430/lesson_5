import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import PropTypes from "prop-types";
import API from "../../../api";
import Qualities from "../../ui/qualities/index";
import Loader from "../../common/loader";
import { Link } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [userById, setUserById] = useState();
    console.log("userById", userById);
    useEffect(() => {
        API.users.getById(userId).then((user) => {
            setUserById(user);
        });
    }, []);
    const handleAllUsers = () => {
        history.goBack();
    };
    if (!userById?.name) {
        return <Loader />;
    }
    return (
        <>
            <div className="container">
                <h1>{`Имя: ${userById.name}`}</h1>
                <h2>{`Профессия: ${userById.profession.name}`}</h2>
                <Qualities key={userById._id} {...userById} />
                <h6>{`completedMeetings: ${userById.completedMeetings}`}</h6>
                <h2>{`Rate: ${userById.rate}`}</h2>
                <button
                    className="btn btn-secondary m-2"
                    onClick={() => {
                        handleAllUsers();
                    }}
                >
                    Все пользователи
                </button>
                <Link to={`/users/${userById._id}/edit`}>
                    <button className="btn btn-primary">Редактировать</button>
                </Link>
            </div>
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
