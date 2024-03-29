import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/pajinate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import PropTypes from "prop-types";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

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
    // setUsers(newArray);
    console.log(newArray);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const hendleProfessionsSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleOnSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data;
      return filteredUsers.filter((u) => u._id !== currentUserId);
    }

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={hendleProfessionsSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <TextField
            placeholder={"Searhc..."}
            value={searchQuery}
            onChange={handleSearchQuery}
          />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleOnSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }

  return "loading...";
};

UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
