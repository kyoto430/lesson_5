import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../../api";
import EditForm from "../../common/form/editForm";
import Loader from "../../common/loader";

const EditPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    return <>{user ? <EditForm user={user} /> : <Loader />}</>;
};

export default EditPage;
