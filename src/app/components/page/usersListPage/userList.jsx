import React from "react";
import PropTypes from "prop-types";
import UserTable from "../../ui/usersTable";
const UserList = ({ ...rest }) => {
    return <UserTable {...rest} />;
};

UserList.propTypes = {
    users: PropTypes.array.isRequired
};

export default UserList;
