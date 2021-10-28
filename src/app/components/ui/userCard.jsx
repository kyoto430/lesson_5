/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import API from "../../api";
import Qualities from "./qualities";
import Loader from "../common/loader";
import Comments from "./comments";
import CommentForm from "./commentForm";

const UserCard = ({ user }) => {
    const [users, setUsers] = useState();
    const [comments, setComments] = useState();
    const { _id, name, profession, rate, completedMeetings, qualities } = user;
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
        API.comments
            .fetchCommentsForUser(_id)
            .then((data) => setComments(data));
    }, []);
    const addComment = (comment) => {
        API.comments.add(comment);
        API.comments
            .fetchCommentsForUser(_id)
            .then((data) => setComments(data));
    };
    const removeComment = (id) => {
        API.comments.remove(id);
        API.comments
            .fetchCommentsForUser(_id)
            .then((data) => setComments(data));
    };
    console.log("users", users);
    console.log("user", user);
    console.log("comments", comments);
    return (
        <>
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <Link
                                    to={`/users/${_id}/edit`}
                                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                                >
                                    <i className="bi bi-gear"></i>
                                </Link>
                                <div className="d-flex flex-column align-items-center text-center position-relative">
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                    />
                                    <div className="mt-3">
                                        <h4>{name}</h4>
                                        <p className="text-secondary mb-1">
                                            {profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="bi bi-caret-down-fill text-primary"
                                                role="button"
                                            ></i>
                                            <i
                                                className="bi bi-caret-up text-secondary"
                                                role="button"
                                            ></i>
                                            <span className="ms-2">{rate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Качества</span>
                                    </h5>
                                    <Qualities qualities={qualities} />
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Завершенные встречи</span>
                                    </h5>

                                    <h1 className="display-1">
                                        {completedMeetings}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        Комментарии
                        {users ? (
                            <CommentForm
                                id={_id}
                                users={users}
                                add={addComment}
                            />
                        ) : (
                            <Loader />
                        )}
                        {users && comments ? (
                            <Comments
                                id={_id}
                                users={users}
                                comments={comments}
                                remove={removeComment}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
