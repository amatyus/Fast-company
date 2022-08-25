import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import userApi from "../api/fake.api/user.api";
import QualitiesList from "./qualitiesList";

const User = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    userApi.getById(userId).then((data) => {
      setUser(data);
    });
  }, [userId]);

  if (!user) {
    return <h3>loading...</h3>;
  }

  const handleClick = () => {
    history.push("/users");
  };

  return (
    <>
      <div>
        <h2>{user.name}</h2>
        <h3>{`Профессия: ${user.profession.name}`}</h3>
        <QualitiesList qualities={user.qualities} />
        <div>{`completedMeetings: ${user.completedMeetings}`}</div>
        <h2 className="mt-3">{`Rate: ${user.rate}`}</h2>
      </div>
      <button onClick={handleClick}>Все пользователи</button>
    </>
  );
};

export default User;
