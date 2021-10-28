import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import Comment from "./comment";

const Comments = ({ users, comments, remove }) => {
    const [newComments, setNewComments] = useState();
    useEffect(() => {
        if (comments) {
            const newComments = comments.map((comment) => ({
                _id: comment._id,
                content: comment.content,
                date: comment.created_at,
                author: users.find((user) => user._id === comment.userId).name
            }));
            setNewComments(newComments);
        }
    }, [comments]);
    if (!comments.length) return null;

    if (!newComments) return <Loader />;

    const sortedComments = newComments.sort((a, b) => b.date - a.date);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Комментарии</h2>
                <hr />
                {sortedComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        remove={remove}
                    />
                ))}
            </div>
        </div>
    );
};

Comments.propTypes = {
    users: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired
};

export default Comments;
