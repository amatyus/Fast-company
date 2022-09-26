import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQuality } = useQualities();
  const userQuality = qualities.map((qualId) => getQuality(qualId));

  if (!isLoading) {
    return (
      <>
        {userQuality.map((qual) => (
          <Qualitie key={qual._id} {...qual} />
        ))}
      </>
    );
  } else {
    return "Loading...";
  }
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};
export default QualitiesList;
