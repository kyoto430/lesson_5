/* eslint-disable multiline-ternary */
import React from "react";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router";
import EditPage from "../components/page/editPage/editPage";
import UserList from "../components/page/usersListPage/userList";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            <UserProvider>
                {userId && edit ? (
                    <EditPage />
                ) : userId ? (
                    <UserPage />
                ) : (
                    <UserList />
                )}
            </UserProvider>
        </>
    );
};
export default Users;
