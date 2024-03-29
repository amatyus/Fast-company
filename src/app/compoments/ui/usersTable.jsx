import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  //   onDelete,
  ...rest
}) => {
  const columns = {
    name: {
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      )
    }
    // delete: {
    //   component: (user) => (
    //     <button onClick={() => onDelete(user._id)} className="btn btn-danger">
    //       delete
    //     </button>
    //   )
    // }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
  //   onDelete: PropTypes.func.isRequired
};

export default UsersTable;
