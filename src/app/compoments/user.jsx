import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, handleDelete, handleUserBookMark }) => (
  <tr key={user._id}>
    <td>{user.name}</td>
    <td>
      {user.qualities.map((item) => (
        <Qualitie key={item._id} {...item} />
      ))}
    </td>
    <td>{user.profession.name}</td>
    <td>{user.completedMeetings}</td>
    <td>{user.rate} /5</td>
    <td>
      <BookMark
        status={user.bookmark}
        onClick={() => handleUserBookMark(user._id)}
      />
    </td>
    <td>
      <button onClick={() => handleDelete(user._id)} className="btn btn-danger">
        delete
      </button>
    </td>
  </tr>
);

export default User;
