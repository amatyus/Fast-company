import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/pajinate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import PropTypes from "prop-types";
import api from "../../../api";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [searchUsername, setSearchUsername] = useState("");
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
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
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchUsername]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const hendleProfessionsSelect = (item) => {
    setSelectedProf(item);
    setSearchUsername("");
  };

  const handleSearchChange = ({ target }) => {
    setSearchUsername(target.value);
    setSelectedProf();
  };

  const handleOnSort = (item) => {
    setSortBy(item);
  };

  if (users.length) {
    const getFiltredUsers = () => {
      if (selectedProf) {
        return users.filter(
          ({ profession }) => profession._id === selectedProf._id
        );
      }

      if (searchUsername) {
        return users.filter(({ name }) =>
          name.toLowerCase().includes(searchUsername.toLowerCase())
        );
      }

      return users;
    };

    const filtredUsers = getFiltredUsers();
    const count = filtredUsers.length;
    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
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
            value={searchUsername}
            onChange={handleSearchChange}
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
