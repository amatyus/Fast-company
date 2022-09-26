import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();
export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState();
  console.log("qualities", qualities);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const qetQualities = async () => {
      const { content } = await qualityService.fethAll();
      try {
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    };
    qetQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        isLoading,
        getQuality
      }}
    >
      {children}
      {/* {!isLoading ? children : <h1>Qualities Loading...</h1>} */}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
