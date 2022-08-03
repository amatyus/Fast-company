import React from "react";
import PropTypes from "prop-types";

const SortIcon = ({ order }) => (
  <i
    className={"bi bi-caret-" + (order === "asc" ? "up-fill" : "down-fill")}
  ></i>
);

SortIcon.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"])
};

export default SortIcon;
