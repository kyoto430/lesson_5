/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import API from "../../../api";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import SearchBar from "../../ui/searchBar";
import UserTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import Loader from "../../common/loader";
import { useUser } from "../../../hooks/useUsers";

const UserList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const { users } = useUser();
    console.log(users);

    const [search, setSearch] = useState("");
    const handleChange = (e) => {
        setSearch(e.target.value);
        setSelectedProf();
    };

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray)
        console.log(newArray);
    };

    useEffect(() => {
        console.log("send reqest professions");
        API.professions.fetchAll().then((data) => {
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
        return (
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
                        <UserTable
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

export default UserList;
