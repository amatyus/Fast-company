import professions from "../ mockData/professions.json";
import qualities from "../ mockData/qualities.json";
import users from "../ mockData/users.json";
import { useState, useEffect } from "react";
import httpService from "../services/htpp.service";

const useMockData = () => {
  const statusConst = {
    idle: "Not Started",
    pending: "In Process",
    successed: "Ready",
    error: "Error occured"
  };

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  const summuryCount = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (progress !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending);
    }
    const newProgress = Math.floor((count / summuryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (progress === 100) {
      setStatus(statusConst.successed);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put("profession/" + prof._id, prof);
        incrementCount();
      }

      for (const user of users) {
        await httpService.put("user/" + user._id, user);
        incrementCount();
      }

      for (const quality of qualities) {
        await httpService.put("quality/" + quality._id, quality);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConst.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
