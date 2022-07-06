import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const handlePhrase = (number) => { 
    if (number === 0) {
        return "Никто с тобой не тусанет"
    }

    const textForm = ["человек", "человека"]
    const numberByAbsTen = Math.abs(number) % 10
    const numberByAbsHundred = Math.abs(number) % 100

    if (numberByAbsHundred > 10 && numberByAbsHundred < 20) { return `${number} ${textForm[0]}` }
    if (numberByAbsTen > 1 && numberByAbsTen < 5) { return `${number} ${textForm[1]}`}
    
    return `${number} ${textForm[0]}`
  };

  let classes = "badge p-2 m-2 "
  classes += users.length === 0 ? "bg-danger" : "bg-primary"

  return (
    <>
      <span className={classes}>{handlePhrase(users.length)}</span>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { _id, name, qualities, profession, completedMeetings, rate } = user;

            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>
                  {qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge bg-${quality.color} mx-1`}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
