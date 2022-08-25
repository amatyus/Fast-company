import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ searchUsername, handleSearchChange }) => {
  return (
    <input
      type="search"
      placeholder="Search..."
      value={searchUsername}
      onChange={handleSearchChange}
    />
  );
};
SearchUsers.propTypes = {
  searchUsername: PropTypes.string,
  handleSearchChange: PropTypes.func
};
export default SearchUsers;
