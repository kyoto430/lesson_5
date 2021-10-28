import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../../api";
import Loader from "../../common/loader";
import UserCard from "../../ui/userCard";

const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((user) => setUser(user));
    }, []);
    return <>{user ? <UserCard user={user} /> : <Loader />}</>;
};

export default UserPage;
