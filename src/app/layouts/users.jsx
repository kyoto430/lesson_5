/* eslint-disable multiline-ternary */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";
import GroupList from "../components/common/groupList";
import api from "../api";
import SearchStatus from "../components/ui/searchStatus";
import _ from "lodash";
import UserList from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router";
import Loader from "../components/common/loader";
import SearchBar from "../components/ui/searchBar";

const Users = () => {
    const params = useParams();
    const userId = params.userId;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const [users, setUsers] = useState();

    const [search, setSearch] = useState("");
    const handleChange = (e) => {
        setSearch(e.target.value);
        setSelectedProf();
    };

    useEffect(() => {
        console.log("send request users");
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };

    useEffect(() => {
        console.log("send reqest professions");
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        return () => {};
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        console.log("page: ", pageIndex);
    };
    const handleProfessionSelect = (item) => {
        console.log("prof select", item);
        setSelectedProf(item);
        setSearch("");
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const searchedUsers = users.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        });
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : searchedUsers;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return userId ? (
            <UserPage users={usersCrop} id={userId} />
        ) : (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchBar search={search} onItemSearch={handleChange} />
                    {count > 0 && (
                        <UserList
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};
Users.propTypes = {
    users: PropTypes.array,
    match: PropTypes.object
};

export default Users;
