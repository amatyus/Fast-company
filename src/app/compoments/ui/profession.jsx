import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getProfessionsLoading,
  getProfessionById
} from "../../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoading());
  const professions = useSelector(getProfessionById(id));

  if (!isLoading) {
    return <p>{professions.name}</p>;
  } else {
    return "Loading...";
  }
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
